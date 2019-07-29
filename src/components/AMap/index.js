import React, { Fragment, useState } from 'react';
import { message, Spin } from 'antd';
import { Map, Marker } from 'react-amap';
import Geolocation from 'react-amap-plugin-custom-geolocation';
import PlaceSearch from './PlaceSearch';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

let geocoder = null;
const defaultMapWrapperHeight = 400;

export const geoCode = (address, callback) => {
  geocoder.getLocation(address, callback);
  // geocoder.getLocation(address, (status, result) => {
  //   console.log(address);
  //   console.log(status);
  //   console.log(result);
  //   if (status === 'complete' && result.geocodes.length) {
  //     return result.geocodes[0];
  //   }
  //   console.error('根据地址查询位置失败');
  //   return {};
  // });
};

function isLocationPosition(locationPosition, position) {
  const { longitude: locationLongitude, latitude: locationLatitude } = locationPosition;
  const { longitude, latitude } = position;
  return locationLongitude === longitude && locationLatitude === latitude;
}

export function AMap(props) {
  const {
    wrapperStyle = {},
    formattedAddress,
    position,
    onClick,
    getFormattedAddress,
    onCreated,
    ...rest
  } = props;
  const [locationPosition, setLocationPosition] = useState({});

  const handleCreatedMap = map => {
    callFunctionIfFunction(onCreated)(map);
    if (!geocoder) {
      geocoder = new window.AMap.Geocoder({
        // city: '010', // 城市设为北京，默认：“全国”
        radius: 1000, // 范围，默认：500
      });
    }
  };

  const regeoCode = (longitude, latitude) => {
    geocoder.getAddress([longitude, latitude], (status, result) => {
      if (status === 'complete' && result.regeocode) {
        callFunctionIfFunction(getFormattedAddress)(result.regeocode.formattedAddress);
        // const address = result.regeocode.formattedAddress;
        // console.log(address);
      } else {
        callFunctionIfFunction(getFormattedAddress)();
        // log.error('根据经纬度查询地址失败')
      }
    });
  };

  const plugins = ['Scale'];

  let renderFormattedAddress = '（请选择地址）';
  if (formattedAddress) {
    renderFormattedAddress = formattedAddress;
  }

  const { height } = wrapperStyle;
  const spinMarginTop = parseInt(height || defaultMapWrapperHeight, 10) / 2 - 16;

  return (
    <Fragment>
      <p>当前地址：{renderFormattedAddress}</p>
      <div
        style={
          Object.keys(wrapperStyle).length ? wrapperStyle : { height: defaultMapWrapperHeight }
        }
      >
        <Map
          amapkey="1460ee2529622747f8faacac3e860bd6"
          plugins={plugins}
          center={position}
          events={{
            created: handleCreatedMap,
            click: event => {
              const { lnglat } = event;
              console.log('click position:', `${lnglat.getLng()}, ${lnglat.getLat()}`);
              callFunctionIfFunction(onClick)(lnglat.getLng(), lnglat.getLat());
              regeoCode(lnglat.getLng(), lnglat.getLat());
            },
          }}
          version="1.4.14&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch"
          zoom={13}
          loading={<Spin style={{ width: '100%', marginTop: spinMarginTop }} />}
          {...rest}
        >
          {position && !isLocationPosition(locationPosition, position) ? (
            <Marker position={position} />
          ) : null}
          <Geolocation
            enableHighAccuracy
            timeout={5000}
            buttonPosition="RB"
            events={{
              created: o => {
                window.AMap.event.addListener(o, 'complete', result => {
                  setLocationPosition({
                    longitude: result.position.lng,
                    latitude: result.position.lat,
                  });
                  callFunctionIfFunction(onClick)(result.position.lng, result.position.lat);
                  callFunctionIfFunction(getFormattedAddress)(result.formattedAddress);
                }); // 返回定位信息
                window.AMap.event.addListener(o, 'error', ({ info, message: msg }) => {
                  message.error('定位失败', info, msg);
                  console.error('定位失败', info, msg);
                }); // 返回定位出错信息
              },
            }}
          />
          <PlaceSearch
            onPlaceSelect={poi => {
              console.log(poi);
              callFunctionIfFunction(onClick)(poi.location.lng, poi.location.lat);
              callFunctionIfFunction(getFormattedAddress)(
                `${poi.district}${poi.address}${poi.name}`
              );
            }}
          />
        </Map>
      </div>
    </Fragment>
  );
}

export default AMap;
