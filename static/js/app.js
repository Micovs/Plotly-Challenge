
// Function to get the data and build a options menu for the different IDs
function BuildOptionMenu() {
  d3.json("./data/samples.json").then(function(data) {
    var names = data.names;
    var select = d3.select("#selDataset");
    // For each Id in the names array, creates a option tag and adds the ID as a text
    names.forEach(id => {
      var option = select.append("option");
      option.text(id);
    })
  });
};
BuildOptionMenu()






function geData() {
    d3.json("./data/samples.json").then(function(x) {
      var data = x;
      console.log(data);
      var samples = data.samples;
      
      var dataId940 = samples.filter(sample =>sample.id == 940);
      // console.log(dataId940);
      var Ids = dataId940[0].otu_ids;
      var Ids10 = dataId940[0].otu_ids.slice(0,10);
      // console.log(Ids);
      var IdsAsString = Ids10.map(Id => "OTU "+Id);
      // console.log(IdsAsString);
      var sample_value = dataId940[0].sample_values;
      var sample_value10 = dataId940[0].sample_values.slice(0,10).reverse();
      // console.log(sample_value);
      var sample_labels = dataId940[0].otu_labels;
      var sample_labels10 = dataId940[0].otu_labels.slice(0,10);
      // console.log(sample_labels);

      var mData = data.metadata.filter( d => d.id == 940)[0];
      console.log(mData)

    buildBarChart(IdsAsString, sample_value10, sample_labels10);

    BuildBubbleChart(Ids, sample_value, sample_labels);

    buildMDataPanel(mData);

    });
};
geData()



function buildBarChart(IdsAsString, sample_value10, sample_labels10){


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

function BuildBubbleChart(Ids, sample_value, sample_labels){

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

function buildMDataPanel (mData){
  var div = d3.select("#sample-metadata");
  Object.entries(mData).forEach(([key, value]) => {
    var p = div.append("p");
    p.text(`${key}: ${value}`);
  });
};

