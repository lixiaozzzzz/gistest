import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
      }),
    }),
  ],
  target: "map",
  view: new View({
    center: [12914838.35, 4814529.9],
    zoom: 8,
    maxZoom: 18,
    projection: "EPSG:3857",
    constrainResolution: true, // 设置缩放级别为整数
    smoothResolutionConstraint: false, // 关闭无级缩放地图
  }),
});
