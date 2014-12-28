//--- RICKSHAW HISTOGRAM ---//
var tv = 250;

// instantiate graph
var graph = new Rickshaw.Graph( {
    element: document.getElementById("histogram"),
    width: 960,
    height: 350,
    renderer: 'line',
    series: new Rickshaw.Series.FixedDuration([{ name: 'baseline' }, { name: 'actual'}], undefined, {
        timeInterval: tv,
        maxDataPoints: 100,
        timeBase: new Date().getTime() / 1000
    })
} );

graph.render();

var i = 0;
var iv = setInterval( function() {

    var data = { baseline: Math.floor(Math.random() * 40) + 120 };

    var randInt = Math.floor(Math.random()*100);
    data.actual = (Math.sin(i++ / 40) + 4) * (randInt + 400);
    data.three = randInt + 300;
    data.four = randInt + 600;

    graph.series.addData(data);
    graph.render();

}, tv );

// X AXIS
var x_axis = new Rickshaw.Graph.Axis.Time({
    graph: graph
});

// Y AXIS
var y_axis = new Rickshaw.Graph.Axis.Y({
  element: document.getElementById('axis0'),
  graph: graph,
  orientation: 'left',
  // scale: scales[0],
  tickFormat: Rickshaw.Fixtures.Number.formatKMBT
});

var legend = new Rickshaw.Graph.Legend({
    element: document.querySelector('#legend'),
    graph: graph
});

// var test = function(data) {
//     console.log('Testing data:', data);
// }

// var returnedData = {};

// new Rickshaw.Graph.JSONP({
//     element: document.querySelector('#histogram'),
//     dataURL: 'http://cloudbrain.rocks/data?userId=1&metric=eeg&start=1418446050&end=1418446950&callback=test',
//     // dataURL: 'http://spot.arfon.org/instances/m1.small/us-east-1b',
//     renderer: 'line',
//     width: 580,
//     height: 250,
//     onData: function(data) {
//               // $.each(data, function(i, item){
//               //     // Initialise key if not present
//               //     if (!returnedData.hasOwnProperty(item.availability_zone)){
//               //         returnedData[item.availability_zone] = [];
//               //     }

//               //     if(item.product_description == "Linux/UNIX"){
//               //         $.each(item.pricing_history, function(date, price){
//               //           returnedData[item.availability_zone].push({x: Date.parse(date), y: parseFloat(price)});
//               //         });
//               //     };
//               // });
//               // var returned = [{name: 'us-east-1b', data: returnedData['us-east-1b']}];
//               // return returned;
//             return d
//     },
//     onComplete: function(transport) {
//         console.log('received data');
//     }
// });