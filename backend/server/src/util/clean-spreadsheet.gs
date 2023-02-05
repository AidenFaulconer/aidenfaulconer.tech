//run this script in google spreadsheets to do a generic cleanup of data
function cleanUpSpreadsheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var newData = [];
  var seen = {};

  //Remove duplicate rows
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var key = row.join();
    if (!seen[key]) {
      seen[key] = true;
      newData.push(row);
    }
  }

  //Normalize data
  for (var i = 0; i < newData.length; i++) {
    var row = newData[i];
    for (var j = 0; j < row.length; j++) {
      row[j] = row[j].toString().trim(); //Remove leading and trailing whitespaces
    //   row[j] = row[j].toUpperCase(); //Convert to uppercase
    }
  }

  //Clear the sheet and write the cleaned up data
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}
