import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Translate,
  LocalizeContextProps,
  withLocalize,
  TranslateFunction,
} from 'react-localize-redux';
// import { Icon, NavBar } from 'antd-mobile';

import { IUser } from '../../../reducers/userReducer';
import { getPriceConstitute } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { Chart, Geom, Axis, Coord, Legend, Guide, Tooltip } from 'bizcharts';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  priceConstitute: IUser['priceConstitute'];
}

interface IDispatchProps {
  getPriceConstitute: typeof getPriceConstitute;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  priceConstitute: state.user.priceConstitute,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getPriceConstitute: () => dispatch(getPriceConstitute()),
});

const convert = (translate: TranslateFunction) => (val: string) =>
  translate('role.' + val.toLowerCase()) as string;

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps &
      IDispatchProps &
      RouteComponentProps &
      LocalizeContextProps;
  }

  public componentDidMount() {
    this.injected.getPriceConstitute();
  }

  public render() {
    const { Html } = Guide;
    const { priceConstitute } = this.injected;
    const translate = convert(this.injected.translate);
    return (
      <div styleName="chart">
        {/* <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="consumer.home.chart.title" />
        </NavBar> */}
        <div styleName="electricity">
          <Translate id="consumer.home.chart.use" />:
          <Translate
            id="edf-per-kw"
            data={{ edf: priceConstitute.statistics.unitPrice }}
          />
        </div>
        {/* <h2 styleName="title">
          <Translate id="consumer.home.chart.comprise" />
        </h2> */}

        <Chart height={400} data={priceConstitute.list} padding="auto" forceFit>
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend itemFormatter={translate} />
          <Tooltip showTitle={false} />
          <Guide>
            <Html
              position={['50%', '50%']}
              html={
                '<div style=color:#8c8c8c;font-size:1.16em;text-align:center;width:10em;>' +
                this.injected.translate('totalCoast') +
                '<br><span style=color:#262626;font-size:2.5em>' +
                this.injected.priceConstitute.statistics.settle +
                '</span ></div>'
              }
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={[
              'item',
              ['#8EF003', '#FCE301', '#FF4E51', '#5688FE', '#FFAA36'],
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: translate(item),
                  value: percent,
                };
              },
            ]}
            select={false}
          />
        </Chart>
      </div>
    );
  }
}
