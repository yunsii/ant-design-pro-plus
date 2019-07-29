import React, { Component } from 'react';
import { Input, Modal, Icon, message } from 'antd';
import AMap from '@/components/AMap';
// import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

export default class LocationPicker extends Component {
  map = null;

  state = {
    mapVisible: false,
    position: undefined,
    formattedAddress: undefined,
  };

  handleMapCreated = map => {
    console.log('amap is created.');
    if (map) this.map = map;
  };

  handleMapClick = (longitude, latitude) => {
    this.setState({
      position: {
        longitude,
        latitude,
      },
    });
  };

  handleMapOk = () => {
    const { onChange } = this.props;
    const { position, formattedAddress } = this.state;
    onChange({
      position,
      formattedAddress,
    });
    this.setState({
      mapVisible: false,
    });
  };

  handleAfterMapClose = () => {
    this.setState({
      position: undefined,
      formattedAddress: undefined,
    });
    if (this.map) {
      this.map.clearMap();
    }
  };

  render() {
    const { value = {}, onChange, ...rest } = this.props;
    const { mapVisible, position, formattedAddress } = this.state;
    const { formattedAddress: inputFormattedAddress } = value;

    return (
      <>
        <Input
          placeholder="请选择地址"
          {...rest}
          value={inputFormattedAddress}
          suffix={<Icon type="environment" onClick={() => this.setState({ mapVisible: true })} />}
        />
        <Modal
          title="高德地图"
          width={600}
          visible={mapVisible}
          onCancel={() => this.setState({ mapVisible: false })}
          onOk={this.handleMapOk}
          afterClose={this.handleAfterMapClose}
        >
          <AMap
            position={position}
            formattedAddress={formattedAddress}
            onCreated={this.handleMapCreated}
            onClick={this.handleMapClick}
            getFormattedAddress={address => {
              if (!address) {
                message.error('根据经纬度转换地址失败');
                this.setState({
                  formattedAddress: null,
                });
                return;
              }
              this.setState({ formattedAddress: address });
            }}
          />
        </Modal>
      </>
    );
  }
}
