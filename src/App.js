import './App.css';
import Table from './Table.js';
import { ExportCSV } from './ExportCSV';
import ImportCSV from './ImportCSV.js';
import { ExportReactCSV } from './ExportReactCSV';

function App() {

  const rows = [
    { Dessert: 'Cupcake', Calories: 305, Fat: 3.7, Carbs: 67, Protein: 4.3 },
    { Dessert: 'Donut', Calories: 452, Fat: 25.0, Carbs: 51, Protein: 4.9 },
    { Dessert: 'Eclair', Calories: 262, Fat: 16.0, Carbs: 24, Protein: 6.0 },
    { Dessert: 'Frozen Yoghurt', Calories: 159, Fat: 6.0, Carbs: 24, Protein: 4.0 },
    { Dessert: 'Gingerbread', Calories: 356, Fat: 16.0, Carbs: 49, Protein: 3.9 },
    { Dessert: 'Honeycomb', Calories: 408, Fat: 3.2, Carbs: 87, Protein: 6.5 },
    { Dessert: 'Ice Cream', Calories: 237, Fat: 9.0, Carbs: 37, Protein: 4.3 },
  ];

  return (
    <div className="App">
      {/* <Table data={rows} />
      <ExportCSV csvData={rows} fileName="Foods" />
      <ExportReactCSV csvData={rows} fileName="Foods" /> */}
      <ImportCSV />
    </div>
  );
};

export default App;


