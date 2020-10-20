
// Function to get the data  and build the initial/start up page with graphs shown for Id 940,
// as well as build a options menu for the different IDs
function BuildStartUpPage() {
  d3.json("./data/samples.json").then(function(data) {
    var names = data.names;

    // ***Build the options menu
    var select = d3.select("#selDataset");
    // For each Id in the names array, creates a option tag and adds the ID as a text
    names.forEach(id => {
      var option = select.append("option");
      option.text(id);
    })

// Call the function that builds the Bar Chart, giving the Id value of 940
  buildBarChart(data, 940);
// Call the function that builds the Bubble Chart, giving the Id value of 940
  BuildBubbleChart(data, 940);
// Call the function that builds the Meta data panel, giving the Id value of 940
  buildMDataPanel(data, 940);
  
  });
};

BuildStartUpPage();


// Creating a function that creates the Bar chart
function buildBarChart(data, variableID){

  // Extract the needed data from the data(JSON), and save it as a variables
  var samples = data.samples;   
  var dataId = samples.filter(sample =>sample.id == variableID);
  
  var Ids10 = dataId[0].otu_ids.slice(0,10);
  var IdsAsString = Ids10.map(Id => "OTU "+Id);

  var sample_value10 = dataId[0].sample_values.slice(0,10).reverse();
  
  var sample_labels10 = dataId[0].otu_labels.slice(0,10);

// Create the trace, layout and the plot
var trace1 = {
  x: sample_value10,
  y: IdsAsString,
  type: 'bar',
  orientation : "h",
  text: sample_labels10,
  marker: {
    color: 'rgb(142,124,195)'
  }
};

var data = [trace1];

var layout = {
  title: 'Top 10 OTUs found',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: false,
  yaxis: {
    zeroline: false,
    gridwidth: 2
  },
  bargap: 0.1
};

Plotly.newPlot("bar", data, layout);

};

// Creating a function that creates the Bubble chart
function BuildBubbleChart(data, variableID){

// Extract the needed data from the data(JSON), and save it as a variables
  var samples = data.samples;    
  var dataId = samples.filter(sample =>sample.id == variableID);
  var Ids = dataId[0].otu_ids;
  var sample_value = dataId[0].sample_values;
  var sample_labels = dataId[0].otu_labels;
 
// Create the trace, layout and the plot
var trace1 = {
  x: Ids,
  y: sample_value,
  text: sample_labels,
  mode: 'markers',
  marker: {
    color: Ids,
    size: sample_value
  }
};

var data = [trace1];

var layout = {
  title: 'Bubble chart for each sample',
  showlegend: false,
  height: 500,
  width: 1000,
  xaxis: {
    visible: true,
    title: {
      text: "OTU ID"}
  }
};

Plotly.newPlot("bubble", data, layout);

};


// Creating a function that creates the MetaData panel
function buildMDataPanel (data, variableID){

  var mData = data.metadata.filter( d => d.id == variableID)[0];
  
  var div = d3.select("#sample-metadata");
    // remove any children from the div, 
    div.html("");
  Object.entries(mData).forEach(([key, value]) => {
    var p = div.append("p");
    p.text(`${key}: ${value}`);
  });
};

// Inactive, see index.html
// On change to the DOM, call optionChanged()
// d3.selectAll("#selDataset").on("change", getData);


// Function called by DOM changes
function getData(){

  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var variableID = dropdownMenu.property("value");
  console.log(variableID);
  // Call function to update the chart
  BuildWithFilter(variableID);
};


// Function that builds the plots with the variable Id that is selected.
function BuildWithFilter(variableID) {
  d3.json("./data/samples.json").then(function(data) {
   

  buildBarChart(data, variableID);

  BuildBubbleChart(data, variableID);

  buildMDataPanel(data, variableID);

  });
};