/*
  AJAX Weather API Call
*/

// let apiKey = '6fe9d0c6040240bbc3d45cfeff37d815';
// let city = 'clarksville';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
//
// jQuery.get( url, function() {})
//   .done(function(data) {
//     styleSVGWithWeather(data);
//     // console.log(data);
//   })
//   .fail(function() {
//     alert( "error" );
//   })
//   .always(function() {
//     // alert( "finished" );
//   });


/*
  Settings
*/
const settings = {
  cellSizeInPixels: 10,
  canvasHeightInCells: 50,
  canvasWidthInCells: 50,
}


/*
  Object Classes
*/
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = '0,0,0,0';
  }

  display() {
    // fill(`rgba(${this.color})`);
    fill(this.color);
    // console.log(jQuery('#toggle-grid').val());
    if (jQuery('#toggle-grid').is(':checked')) {
      strokeWeight(1);
    } else {
      strokeWeight(0);
    }
    stroke(220, 220, 220)
    rect(this.x, this.y, settings.cellSizeInPixels, settings.cellSizeInPixels);
  }
}


/*
  Resource Creation
*/
const grid = [];
for (var row = 0; row < settings.canvasWidthInCells; row++) {
  grid[row] = [];
  for (var col = 0; col < settings.canvasHeightInCells; col++) {
    grid[row].push(
      new Cell(col * settings.cellSizeInPixels, row * settings.cellSizeInPixels)
    );
  }
}

/*
  Our Functions
*/
function displayCells() {
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      cell.display();
    }
  }
}


/*
  p5 Functionality
*/
function setup() {
  createCanvas((settings.canvasWidthInCells * settings.cellSizeInPixels), (settings.canvasHeightInCells * settings.cellSizeInPixels));
}

function draw() {
  background(100, 173, 245); // sky blue
  displayCells();
}

function mouseClicked() {
  // loop through all cells and test
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if ( (mouseX >= cell.x && mouseX < cell.x + settings.cellSizeInPixels) && (mouseY >= cell.y && mouseY < cell.y + settings.cellSizeInPixels) ) {
        // console.log(jQuery('input').val());
        cell.color = jQuery('#color-input').val();
      }
    }
  }
}
