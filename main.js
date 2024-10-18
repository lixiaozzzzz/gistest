import Map from "ol/Map.js";
// import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj";
import { ZoomToExtent, ZoomSlider, FullScreen } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { GeoJSON } from "ol/format";
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

const style = new Style({
  image: new Circle({
    radius: 15,
    fill: new Fill({
      color: "#ff2d51",
    }),
    stroke: new Stroke({
      color: "#333",
      width: 2,
    }),
  }),
});
const point = new Feature({
  geometry: new Point(fromLonLat([125.42, 43.78])),
});
point.setStyle(style);
const source = new VectorSource({
  features: [point],
});
const layer = new VectorLayer({
  source: source,
});
// map.addLayer(layer);

const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [126.6, 45.7],
          [126.7, 45.8],
          [126.8, 45.6],
        ],
      },
      properties: {
        name: "Line Example",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.6, 45.7],
            [126.7, 45.9],
            [126.9, 45.8],
            [126.8, 45.6],
            [126.6, 45.7],
          ],
        ],
      },
      properties: {
        name: "Polygon Example",
      },
    },
  ],
};

var nsource = new VectorSource({
  url: "./data/geojson.json",
  format: new GeoJSON({
    dataProjection: "EPSG:4326", // 输入数据投影
    featureProjection: "EPSG:3857", // 输出地图投影
  }),
  //   features: new GeoJSON().readFeatures(geojsonData, {
  //     dataProjection: "EPSG:4326", // 输入数据投影
  //     featureProjection: "EPSG:3857", // 输出地图投影
  //   }),
});
var nlayer = new VectorLayer({
  source: nsource,
});
var nstyle = new Style({
  stroke: new Stroke({
    color: "black",
    width: 2,
  }),
  fill: new Fill({
    color: "red",
  }),
});
nlayer.setStyle(nstyle);
map.addLayer(nlayer);

const clickSource = new VectorSource();
const clickAddLayer = new VectorLayer();
clickAddLayer.setSource(clickSource);
map.addLayer(clickAddLayer);
map.on("click", (evt) => {
  const { coordinate } = evt;
  const npoint = new Feature({
    geometry: new Point(coordinate),
  });
  clickAddLayer.setStyle(style);
  clickSource.addFeature(npoint);
  const view = map.getView();
  view.animate({
    center: coordinate,
  });
});

document.querySelector("#reset").addEventListener("click", () => {});
