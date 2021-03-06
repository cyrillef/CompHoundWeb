// Change the token and urn (translated file location) before running.

//var token = 'TB4KC708xPeHYKxDBerbc850MOsS';

var lmvAuthToken = new LmvAuthToken();

var urn_little_house = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29tcGhvdW5kLWJ1Y2tldC9saXR0bGVfaG91c2VfMjAxNi5ydnQ';
var urn_rst_advanced_sample_project = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29tcGhvdW5kLWJ1Y2tldC9yc3RfYWR2YW5jZWRfc2FtcGxlX3Byb2plY3QucnZ0';
var urn = urn_rst_advanced_sample_project;

function getToken() {
  //return token;
  return lmvAuthToken.value();
}

function lmv_loadDocument(viewer, documentId) {
  // Find the first 3d geometry and load that.
  Autodesk.Viewing.Document.load(documentId, function(doc) {
    var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
      doc.getRootItem(),
      { 'type' : 'geometry', 'role' : '3d' },
      true);

    if (geometryItems.length > 0) {
      viewer.load(doc.getViewablePath(geometryItems[0]));
    }
  },
  function(errorMsg) { // onErrorCallback
    alert('Load Error: ' + errorMsg);
  });
}

function lmv_initialize() {
  var options = {
    'document' : 'urn:' + urn,
    'env':'AutodeskProduction',
    'getAccessToken': getToken,
    'refreshToken': getToken };

  var viewerElement = document.getElementById('viewer');
  var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});

  Autodesk.Viewing.Initializer(options,function() {
    viewer.initialize();
    lmv_loadDocument(viewer, options.document);
  });
}
