function replaceKeysWithValuesAndDeleteColumns() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var companiesSheet;

  // Find the sheet containing "Companies"
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().indexOf("Companies") !== -1) {
      companiesSheet = sheets[i];
      break;
    }
  }

  if (!companiesSheet) {
    Logger.log("No sheet containing 'Companies' found.");
    return;
  }

  // Parse rows and create companyNames object
  var data = companiesSheet.getDataRange().getValues();
  var companyNames = {};

  for (var i = 1; i < data.length; i++) {
    var key = data[i][1]; // Second column as key
    var value = data[i][0]; // First column as value
    companyNames[key] = value;
  }

  // Duplicate the first sheet
  var firstSheet = ss.getSheets()[0];
  var duplicatedSheet = firstSheet.copyTo(ss);
  duplicatedSheet.setName(firstSheet.getName() + " - EXPORT");

  // Replace keys with values in the duplicated sheet
  var range = duplicatedSheet.getDataRange();
  var values = range.getValues();

  for (var row = 0; row < values.length; row++) {
    for (var col = 0; col < values[row].length; col++) {
      var cellValue = values[row][col];
      if (companyNames.hasOwnProperty(cellValue)) {
        values[row][col] = companyNames[cellValue];
      }
    }
  }

  range.setValues(values);

  // Define headers to be deleted
  var headersToDelete = [
    "Who Bought What?",
    "Slug",
    "Collection ID",
    "Item ID",
    "Created On",
    "Updated On",
    "Published On",
    "SEO Title",
    "SEO Metadescription",
    "Featured Image",
    "Transaction Synopsis",
    "Market Significance",
    "Client Impact",
    "Testimonial",
    "Testimonial Author Name",
    "Testimonial Author Image"
  ];

  // Delete columns with specific headers
  var headerRow = duplicatedSheet.getRange(1, 1, 1, duplicatedSheet.getLastColumn()).getValues()[0];
  for (var i = headerRow.length - 1; i >= 0; i--) {
    if (headersToDelete.indexOf(headerRow[i]) > -1) {
      duplicatedSheet.deleteColumn(i + 1);
    }
  }
}
