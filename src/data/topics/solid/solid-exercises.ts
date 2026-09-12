import type { Exercise, ExerciseBank } from "../../types.ts";

const principles = [
  ["s", "S — Single Responsibility"],
  ["o", "O — Open–Closed"],
  ["l", "L — Liskov Substitution"],
  ["i", "I — Interface Segregation"],
  ["d", "D — Dependency Inversion"],
] as const;

// Recognition questions share their five labels, but explain the specific scenario.
function identify(id: string, title: string, prompt: string, correct: string, explanation: string): Exercise {
  return {
    id, title, prompt, correctOptionId: correct,
    options: principles.map(([key, label]) => ({
      id: key, label,
      explanation: key === correct ? explanation : `Look at the responsibility or contract described here. ${explanation}`,
    })),
  };
}

// Each option keeps its own feedback next to its wording.
function apply(id: string, title: string, prompt: string, options: [string, string, string][], correctOptionId: string, code?: string): Exercise {
  return { id, title, prompt, code, correctOptionId,
    options: options.map(([optionId, label, explanation]) => ({ id: optionId, label, explanation })),
  };
}

export const solidExercises: ExerciseBank = [
  {
    id: "s",
    apply: [
      apply("s-apply-a", "An invoice with two owners", "Finance changes tax rules. The design team changes PDF spacing. Both edits currently happen in makeInvoice. How should you separate these independent responsibilities?", [
        ["a", "Put every line in a separate function.", "A line is not a responsibility. Group the calculation separately from the layout."],
        ["b", "Calculate invoice totals separately, then pass the result to the PDF renderer.", "Tax calculation and document layout change for different reasons. Separate those responsibilities and pass the result between them."],
        ["c", "Rename makeInvoice to processInvoice.", "A new name does not separate tax policy from layout decisions."],
      ], "b", "function makeInvoice(items: Item[]) {\n  const total = items.reduce((sum, item) => sum + item.price * 1.2, 0);\n  return drawPdf(total, { margin: 24 });\n}"),
      apply("s-apply-b", "A weather panel", "A module converts sensor readings into Celsius and chooses the dashboard's chart colors. Scientists change the conversion rules; designers change the palette. What is the useful boundary?", [
        ["a", "Keep conversion in a data function and palette decisions in presentation code.", "Conversion and presentation have independent reasons to change. The panel can compose their results."],
        ["b", "Create a class for every color.", "That adds structure without separating the scientific calculation from presentation."],
        ["c", "Move both tasks into a larger dashboard function.", "A larger function still couples the two responsibilities."],
      ], "a"),
      apply("s-apply-c", "Building an event badge", "An event tool decides whether a guest qualifies for VIP access and positions text on their printed badge. Admission policy and print design change independently. Which refactor helps?", [
        ["a", "Shorten the function until it has fewer than ten lines.", "Line count does not tell you whether independent responsibilities are coupled."],
        ["b", "Store the font size inside the eligibility rule.", "This ties a presentation detail even more tightly to admission policy."],
        ["c", "Compute access eligibility first, then give that result to the badge renderer.", "The admission decision and the badge layout can now change independently."],
      ], "c"),
    ],
    identify: [
      identify("s-identify-a", "Payroll meets email styling", "One module calculates overtime under employment rules and builds the HTML styling for payslip emails. The payroll team and design team repeatedly edit it for unrelated reasons. Which principle is most directly violated?", "s", "Single Responsibility: payroll rules and email presentation are independent responsibilities with different reasons to change."),
      identify("s-identify-b", "A photo pipeline", "An image-analysis function measures exposure. A separate component presents its result. New exposure formulas do not require editing the component, and layout changes do not require editing the analysis. Which principle does this separation demonstrate?", "s", "Single Responsibility: analysis and presentation each own a focused responsibility and can change independently."),
      identify("s-identify-c", "Packing a delivery", "A single module decides delivery fees and controls the animation of a van on a tracking screen. Pricing updates and animation updates keep colliding in this module. Which principle is most directly violated?", "s", "Single Responsibility: pricing policy and animation behavior change for unrelated reasons and should have separate owners."),
    ],
  },
  {
    id: "o",
    apply: [
      apply("o-apply-a", "One more export format", "A download panel already accepts an exporter with a run(rows) method. CSV and JSON exporters work. You need Markdown export. What should you add?", [
        ["a", "A Markdown exporter that follows the existing contract.", "The established extension point lets you add Markdown while leaving the download panel's stable behavior unchanged."],
        ["b", "A Markdown special case inside every download button.", "Repeating format-specific branches bypasses the extension point and spreads changes."],
        ["c", "A second copy of the entire download panel.", "Copying the panel duplicates stable behavior that the exporter contract already lets you reuse."],
      ], "a", "type Exporter = { run: (rows: Row[]) => string };\nfunction download(rows: Row[], exporter: Exporter) {\n  return exporter.run(rows);\n}"),
      apply("o-apply-b", "Drawing a new map marker", "A map uses a registry from marker names to drawing functions. You need a bicycle marker. The existing drawing contract already supports it. What is the smallest useful extension?", [
        ["a", "Rewrite the map's zoom and drag handlers.", "A marker does not require changes to unrelated map interactions."],
        ["b", "Register a bicycle drawing function using the existing contract.", "Registering a new implementation extends the supported markers without rewriting the stable map loop."],
        ["c", "Add bicycle branches throughout the map loop.", "The registry already provides a boundary for new marker behavior. Scattered branches defeat it."],
      ], "b"),
      apply("o-apply-c", "A new audio effect", "An audio tool processes samples through an ordered list of effects. Each effect takes and returns the same sample format. How should you add an echo effect?", [
        ["a", "Modify every existing effect to know about echo.", "Effects need not know about one another when the processing contract already composes them."],
        ["b", "Duplicate the processing loop into an echo-only version.", "Duplicating the stable loop makes future maintenance harder."],
        ["c", "Implement echo with the same contract and include it in the effects list.", "The existing pipeline can run a new effect without changing its processing logic."],
      ], "c"),
    ],
    identify: [
      identify("o-identify-a", "A growing chart collection", "A dashboard accepts registered chart renderers. Adding a heatmap only requires implementing and registering another renderer; its stable dashboard loop stays untouched. Which principle is demonstrated?", "o", "Open–Closed: new chart behavior is added through an established extension point instead of rewriting stable orchestration."),
      identify("o-identify-b", "Every shipping provider changes the loop", "A parcel tool must support new shipping providers frequently. Each addition requires editing the same central switch in its otherwise stable quotation loop. Which principle suggests an extension point for providers?", "o", "Open–Closed: a provider contract could let new quotation implementations extend the tool without repeatedly editing its stable loop."),
      identify("o-identify-c", "A new syntax language", "A code viewer accepts a syntax-highlighting strategy. Adding Rust means supplying another strategy; the viewer's scrolling and rendering flow stay unchanged. Which principle is demonstrated?", "o", "Open–Closed: a new strategy extends supported languages through a useful boundary while preserving the viewer's stable behavior."),
    ],
  },
  {
    id: "l",
    apply: [
      apply("l-apply-a", "An empty search result", "SearchProvider promises to return an array, including an empty array for no matches. A replacement returns null when nothing matches. What must change to make it interchangeable?", [
        ["a", "Ask every caller to check which provider it received.", "Callers should be able to rely on the shared contract, without special cases for one replacement."],
        ["b", "Return an empty array when there are no matches.", "The replacement now preserves the promised result even for the empty case."],
        ["c", "Keep null and give the provider a clearer name.", "Renaming does not restore the array result that callers were promised."],
      ], "b", "type SearchProvider = {\n  search: (query: string) => Promise<Result[]>;\n};\n// Callers may always iterate over the resolved array."),
      apply("l-apply-b", "Who owns the playlist?", "A playlist sorter promises a sorted copy and guarantees the input array stays unchanged. Your replacement sorts the input in place. Which fix preserves the contract?", [
        ["a", "Copy the array before sorting and return the sorted copy.", "The replacement must preserve the no-mutation guarantee as well as return the right order."],
        ["b", "Document that this replacement sometimes changes its input.", "A replacement cannot silently weaken a guarantee that existing callers depend on."],
        ["c", "Only mutate the array when it has more than ten tracks.", "The no-mutation guarantee applies to every supported playlist size."],
      ], "a"),
      apply("l-apply-c", "A narrower volume control", "A volume adapter promises to accept every value from 0 through 100. A new adapter rejects values above 50. How can it replace the original safely?", [
        ["a", "Make callers detect the adapter and restrict their sliders.", "That makes existing callers compensate for a replacement that rejects previously valid inputs."],
        ["b", "Throw a more descriptive error above 50.", "A clearer error still rejects inputs accepted by the shared contract."],
        ["c", "Support the full 0–100 input range, mapping it to the device's native scale internally.", "The adapter can translate internally while preserving the input range promised to its callers."],
      ], "c"),
    ],
    identify: [
      identify("l-identify-a", "Cancel twice", "An upload handle promises that cancel() is safe to call repeatedly. A replacement throws on the second call, breaking a cleanup routine that relied on that guarantee. Which principle is violated?", "l", "Liskov Substitution: the replacement breaks the original behavioral promise that repeated cancellation is safe."),
      identify("l-identify-b", "Same units, different device", "Two temperature sensors implement readCelsius(). Both return degrees Celsius and follow the same documented failure behavior, so callers can swap them without changing assumptions. Which principle is demonstrated?", "l", "Liskov Substitution: both implementations preserve the units and failure contract that callers expect."),
      identify("l-identify-c", "A preview changes the file", "A preview generator promises never to modify its source file. A replacement returns a correct preview but also overwrites the source with a compressed version. Which principle is violated?", "l", "Liskov Substitution: returning the right output is not enough; the replacement also has to preserve the no-modification guarantee."),
    ],
  },
  {
    id: "i",
    apply: [
      apply("i-apply-a", "A play button's dependencies", "A play button only starts playback, but its props require play, record, trim, and exportAudio. Which prop contract removes its unnecessary dependencies?", [
        ["a", "Require all four methods and supply empty functions.", "Empty functions disguise dependencies the button never needed."],
        ["b", "Require only play: () => void.", "The button asks for exactly the capability it uses. Recording and editing remain separate."],
        ["c", "Add more optional media methods for future buttons.", "Speculative methods do not help this button's focused contract."],
      ], "b", "type StudioControls = {\n  play: () => void;\n  record: () => void;\n  trim: () => void;\n  exportAudio: () => void;\n};"),
      apply("i-apply-b", "Checking a scanner", "A connection indicator only calls isConnected(). Its type also requires scanDocument() and calibrate(). What should the indicator depend on?", [
        ["a", "A small connection-status interface with isConnected().", "The indicator can work with anything that supplies status, without depending on scanning or calibration."],
        ["b", "The full scanner type, even for devices that cannot scan.", "Requiring unrelated scanner operations prevents useful clients from supplying just connection status."],
        ["c", "A scanner object whose unused methods always throw.", "Throwing stubs are a symptom of asking for capabilities this client does not use."],
      ], "a"),
      apply("i-apply-c", "A page counter", "A PDF page-count badge only needs pageCount. Its props also demand encryption settings and watermark-editing callbacks. How should its props change?", [
        ["a", "Keep all props so every PDF component has an identical interface.", "Different clients use different capabilities. A uniform oversized interface creates unnecessary coupling."],
        ["b", "Require the callbacks but never call them.", "Unused required callbacks still burden callers and tests."],
        ["c", "Accept only pageCount: number.", "The badge's small contract contains exactly the data needed to display its count."],
      ], "c"),
    ],
    identify: [
      identify("i-identify-a", "A clock with too many requirements", "A clock display only reads the current time, but its interface also requires setting alarms and synchronizing a remote calendar. Which principle addresses these unused requirements?", "i", "Interface Segregation: the display should require time-reading capabilities rather than unrelated alarm and calendar operations."),
      identify("i-identify-b", "A focused zoom control", "A zoom slider receives only the current zoom value and an onZoom callback. It does not require drawing, exporting, or layer-editing methods from the canvas editor. Which principle is demonstrated?", "i", "Interface Segregation: the slider depends only on the capabilities it actually uses."),
      identify("i-identify-c", "A printer's ink display", "An ink-level widget is forced to accept print, staple, and fax methods although it only displays inkPercent. Which principle is most directly violated?", "i", "Interface Segregation: a small display should not force its callers to provide unrelated printer operations."),
    ],
  },
  {
    id: "d",
    apply: [
      apply("d-apply-a", "A reminder tied to one vendor", "A reminder policy decides when to alert someone, but directly imports a vendor's notification SDK. You need to use a different delivery service in another environment. What boundary helps?", [
        ["a", "Accept a sendReminder(message) capability and wire the vendor adapter outside the policy.", "The policy depends on the capability it needs; the external adapter handles the vendor's details."],
        ["b", "Move the same vendor import to the top of the policy file.", "Moving the import does not change the policy's dependency on vendor details."],
        ["c", "Copy the policy for every notification vendor.", "Copies duplicate the reminder rules instead of separating them from delivery implementations."],
      ], "a", "import { vendorNotify } from './vendor-sdk';\nfunction remind(due: boolean) {\n  if (due) vendorNotify('Time for a break');\n}"),
      apply("d-apply-b", "Checking a route's weather", "A route-safety policy imports one weather provider's SDK and reads its nested response fields. How can you keep weather-vendor details out of the safety rules?", [
        ["a", "Make the safety policy inherit from the vendor SDK.", "Inheritance would tie the safety rules more closely to the provider's implementation."],
        ["b", "Give the policy a getConditions(location) contract returning the simple data it needs; adapt the SDK outside.", "The high-level safety decision uses its own small contract, while an adapter translates the vendor response."],
        ["c", "Pass the entire raw SDK response to every safety rule.", "Raw vendor fields still make each rule depend on provider details."],
      ], "b"),
      apply("d-apply-c", "Scheduling across time zones", "A scheduling rule creates a specific third-party time-zone client internally. You need to test the rule with fixed times and replace that provider later. What should change?", [
        ["a", "Install the provider SDK in every test and keep constructing it inside the rule.", "Tests would still be tied to the concrete service instead of the scheduling behavior."],
        ["b", "Add a test-only provider branch inside each scheduling decision.", "Provider-specific branches mix infrastructure decisions into the rule."],
        ["c", "Pass a localTime(zone) function into the rule and construct the provider adapter at the app boundary.", "The scheduling policy now depends on a time capability; production and fixed-time test adapters can fulfill it."],
      ], "c"),
    ],
    identify: [
      identify("d-identify-a", "Fraud rules know the transport", "A fraud-detection policy directly creates a specific HTTP client and parses a vendor's response format inside its business decisions. Which principle calls for separating these low-level details behind a policy-facing contract?", "d", "Dependency Inversion: high-level fraud rules should depend on the risk-data capability they need, with an adapter handling HTTP and vendor formats."),
      identify("d-identify-b", "A reservation policy with a boundary", "A reservation rule receives an availability lookup contract. A separate adapter implements that contract using a remote service. The rule never imports the service SDK. Which principle is demonstrated?", "d", "Dependency Inversion: the high-level rule depends on an abstraction, and the service detail fulfills that abstraction."),
      identify("d-identify-c", "Ranking depends on one analytics SDK", "A recommendation policy imports a particular analytics vendor and calls vendor-specific methods throughout its ranking rules. Which principle suggests having that vendor fulfill a small usage-data contract instead?", "d", "Dependency Inversion: ranking policy should depend on the usage data it needs rather than a particular analytics implementation."),
    ],
  },
];
