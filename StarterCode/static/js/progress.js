//Setting up to read the JSON
d3.json("samples.json").then(function(data) {
    console.log(data);

//Setting variables to use in the website
    let samplevalues=data.samples.map(info=>info.sample_values);
    let otuID=data.samples.map(info=>info.otu_ids);
    let otulabel=data.samples.map(info=> info.otu_labels);
    let metaData=data.metadata
    let samples=data.samples

   // console.log(samplevalues.slice(0,10));
    //console.log(otuID.slice(0,10));
    //console.log(otulabel);

//Filtering the data to populate the graph   
    const filtered = metaData.filter(metaDatavalue => metaDatavalue.id==940);
    //console.log(filtered[0].ethnicity)
//Line 17 is demonstrating how to access the data inside the array returned by the filter. It's encased in a peel of the
//array formatting and you have to use [0] to take the peel off and reveal the dictionary inside, which can then have its
//information accessed by the .ethnicity, which is calling the key that corresponds to the value "caucasion"


    const filteredSamples = samples.filter(filteredsamplevalues => filteredsamplevalues.id==940);
    console.log (filteredSamples);
    
    //const filteredotuID = otuID.filter(filteredotuIDvalues=>fitleredotuIDvalues.id=-940)
    //console.log(filteredSamples[0].sample_values.slice(0,10))


//Slicing out the top ten items in the filteredSamples
    var otuids = filteredSamples[0].otu_ids.slice(0,10);
    var otuidsstring=[];

 
//checking the output
    console.log (otuids);



    // for (const property in otuids) {
    //     console.log(`OTU ${otuids[property]}`);
        
    //   }
    otuidsstring=otuids.map(e=>`OTU ${e}`);

//set up the trace to populate the graph
    let trace1 = {
        type: "bar",
        orientation: "h",
        x: filteredSamples[0].sample_values.slice(0,10),
        y: otuidsstring
    };

    let layout={
        barmode: "group",
        
    };
    let bardata= [trace1];

    Plotly.newPlot("bar", bardata, layout);

//This is for the dropdown menu--I think the x and y arrays are already established. This needs to be updated
//for the dataset to reflect the input from the user, not just the example of 940.

// Initializes the page with a default plot
function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    var x = [];
    var y = [];
  
    if (dataset === 'dataset1') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }
  
    else if (dataset === 'dataset2') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  init();



//This is for the bubble chart. Does it need to be outside the function? The bar graph does not populate when the
//code below is uncommented. Again, what needs to be adjusted? How does the  marker color fit in here (otu_ids)?
      var trace3 = {
        x: otu_ids,
        y: sampleValues,
        text: otu_label,
        mode: 'markers',
        marker: {
          color: otu_ids,

          size: sampleValues
        }
      };
      
      var data = [trace3];
      
      var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('myDiv', data, layout);


});

function buildTable(id) {
    d3.json("samples.json").then(function(data) {
        console.log(data);
    
    //Setting variables to use in the website
        let metaData=data.metadata
    
    //Filtering the data to populate the graph   
        const filtered = metaData.filter(metaDatavalue => metaDatavalue.id==id);
    var element = filtered[0]
    var panel = d3.select("#sample-metadata");

    panel.append('h6').text(`ethnicity: ${element.ethnicity}`);
    panel.append('h6').text(`location: ${element.location}`);
    panel.append('h6').text(`location: ${element.location}`);
    panel.append('h6').text(`location: ${element.location}`);
    panel.append('h6').text(`location: ${element.location}`);
    panel.append('h6').text(`location: ${element.location}`);
    }
    )}

buildTable(940);


// This snippet of code was possibly how to populate the dropdown with the
// IDs from samples.json
// https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
d3.json("samples.json").then(function(data){ 
    let names=data.names

    var selectedDataset = $("#selDataset");
    selectedDataset.empty();
    selectedDataset.append('<option selected="true" disabled>Choose ID</option>');
    selectedDataset.prop('selectedIndex', 0);
    $.each(names, function(index, value){
        selectedDataset.append($(`<option></option>`).attr('value', value).text(value));
    })
});