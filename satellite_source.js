var filteredRegion = imageCollection
  .filterBounds(region)
  .filterDate("2024-12-20", "2025-02-01");
print(filteredRegion);

var leastCloudyImage = filteredRegion.sort("CLOUDY_PIXEL_PERCENTAGE").first();
Map.centerObject(region, 10);
Map.addLayer(
  leastCloudyImage,
  { bands: ["B12"], min: 0, max: 3000 },
  "Least Cloudy Image"
);
Export.image.toDrive({
  image: leastCloudyImage.select("B12"), // select the band you want to export
  description: "LeastCloudyImage", // name of the export task
  scale: 30, // set the resolution (in meters)
  region: region, // the region to export
  fileFormat: "GeoTIFF", // format to export as GeoTIFF
  folder: "GEE_Exports", // optional: folder on Google Drive to save the file
  maxPixels: 1e8, // set maximum number of pixels for export
});
