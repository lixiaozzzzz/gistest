import Map from "ol/Map.js";
// import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj";
import { ZoomToExtent, ZoomSlider, FullScreen } from "ol/control";
const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
      }),
    }),
    // new TileLayer({
    //   source: new OSM(),
    // }),
  ],
  target: "map",
  view: new View({
    center: fromLonLat([125.32, 43.88]),
    zoom: 10,
    // maxZoom: 18,
    projection: "EPSG:3857",
    constrainResolution: true, // 设置缩放级别为整数
    smoothResolutionConstraint: false, // 关闭无级缩放地图
  }),
});
const extent = [
  fromLonLat([126.5, 45.5])[0], // 左下角 (minX, minY)
  fromLonLat([126.5, 45.5])[1],
  fromLonLat([126.8, 46.0])[0], // 右上角 (maxX, maxY)
  fromLonLat([126.8, 46.0])[1],
];
const zoomToExtent = new ZoomToExtent({
  extent,
});
const zoomSlider = new ZoomSlider();
const fullscreen = new FullScreen();
map.addControl(zoomToExtent);
map.addControl(zoomSlider);
map.addControl(fullscreen);
