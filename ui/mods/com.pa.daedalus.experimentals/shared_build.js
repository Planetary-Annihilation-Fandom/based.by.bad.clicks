var newBuild = {
"/pa/units/paeiou/experimental_gantry/experimental_gantry.json": ["gantry", 0,{ row: 0, column: 4, titans: true }],
"/pa/units/paeiou/big_bill/big_bill.json": ["experimental", 0,{ row: 2, column: 2, titans: true }],
"/pa/units/paeiou/pineapple/pineapple.json": ["experimental", 0,{ row: 2, column: 1, titans: true }],
"/pa/units/paeiou/floater/floater.json": ["experimental", 0,{ row: 2, column: 0, titans: true }],
"/pa/units/paeiou/spider/spider.json": ["bot", 0,{ row: 1, column: 7, titans: true }],
"/pa/units/paeiou/dolfin/dolfin.json": ["sea", 0,{ row: 1, column: 6, titans: true }],
"/pa/units/paeiou/poseidon/poseidon.json": ["factory", 0,{ row: 0, column: 1, titans: true }],
"/pa/units/paeiou/yellowjacket/yellowjacket.json": ["air", 0,{ row: 0, column: 2, titans: true }],
"/pa/units/paeiou/horntail/horntail.json": ["experimental", 0,{ row: 1, column: 2, titans: true }],
"/pa/units/paeiou/sigma/sigma.json": ["orbital_structure", 0,{ row: 0, column: 1, titans: true }],
"/pa/units/paeiou/dox_materializer/dox_materializer.json": ["utility", 0,{ row: 2, column: 5, titans: true }],
"/pa/units/paeiou/ligma/ligma.json": ["L_orbital_structure", 0,{ row: 0, column: 1, titans: true }],

}
if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
_.extend(Build.HotkeyModel.SpecIdToGridMap, newBuild);
}