const pricePerHour = [
  0.3766,
  0.3766,
  0.3766,
  0.3766,
  0.3766,
  0.3766,
  0.3766,
  0.677,
  0.677,
  0.677,
  0.9864,
  1.0761,
  1.0761,
  1.0761,
  0.9864,
  0.9864,
  1.0761,
  1.0761,
  0.9864,
  0.9864,
  0.9864,
  0.9864,
  0.677,
  0.677,
];

// 实时电价
export function realTimePrice() {
  return pricePerHour[new Date().getHours()];
}

const mutableData = {
  // Output发电量(kW)
  // Direct太阳直射辐射强度(kW/m2)
  // Diffuse太阳散射辐射强度(kW/m2)
  // Temperature温度(ºC)
  PHOTOVOLTAIC: [
    [0, 0, 0, 35.21],
    [0, 0, 0, 37.68],
    [0, 0, 0, 38.82],
    [0, 0, 0, 38.84],
    [0, 0, 0, 38.23],
    [182.66, 0, 35, 37.98],
    [557.6, 1, 81, 37.72],
    [1576.67, 19, 186, 37.21],
    [3028.36, 70, 319, 36.8],
    [3653.26, 87, 386, 36.66],
    [3162.95, 37, 371, 36.27],
    [2124.66, 10, 266, 35.47],
    [1913.15, 8, 242, 34.33],
    [1480.53, 4, 191, 33.77],
    [1067.14, 3, 143, 33.39],
    [999.84, 2, 134, 32.92],
    [1288.25, 5, 166, 32.42],
    [788.33, 2, 109, 32.0],
    [307.64, 0, 52, 31.8],
    [0.0, 0, 6, 31.61],
    [0.0, 0, 0, 31.46],
    [0.0, 0, 0, 31.31],
    [0.0, 0, 0, 31.36],
    [0.0, 0, 0, 31.69],
  ],

  // Output发电量(kW)
  // Windspeed风速(m/s)
  WIND: [
    [2750.86, 5.69],
    [1353.6, 4.56],
    [553.08, 3.58],
    [261.99, 3.03],
    [160.1, 2.76],
    [203.77, 2.87],
    [203.77, 2.86],
    [145.55, 2.68],
    [422.09, 3.34],
    [756.85, 3.87],
    [1062.5, 4.24],
    [1164.38, 4.36],
    [1149.83, 4.35],
    [1397.26, 4.6],
    [1761.13, 4.93],
    [2037.67, 5.16],
    [2066.78, 5.19],
    [1979.45, 5.12],
    [2314.21, 5.38],
    [3231.17, 6.01],
    [3653.26, 6.26],
    [3158.39, 5.96],
    [2328.77, 5.39],
    [1644.69, 4.83],
  ],

  // Output发电量(kW)
  // Electricity Consumption of Electric Refrigerator电制冷机消耗电量
  // Cold Load冷负荷(kW)
  // Thermal Load热负荷(kW)
  // Fuel Price燃料价格(RMB/m3)
  GAS: [
    [2789, 1394.5, 7948.65, 996.07, 2.65],
    [2769, 1384.5, 7891.65, 988.93, 2.65],
    [2679, 1339.5, 7635.15, 956.79, 2.65],
    [2719, 1359.5, 7749.15, 971.07, 2.65],
    [2703, 1351.5, 7703.55, 965.36, 2.65],
    [2646, 1323.0, 7541.1, 945.0, 2.65],
    [2681, 1340.5, 7640.85, 957.5, 2.65],
    [2737, 1368.5, 7800.45, 977.5, 2.65],
    [2764, 1382.0, 7877.4, 987.14, 2.65],
    [2756, 1378.0, 7854.6, 984.29, 2.65],
    [2778, 1389.0, 7917.3, 992.14, 2.65],
    [2655, 1327.5, 7566.75, 948.21, 2.65],
    [2645, 1322.5, 7538.25, 944.64, 2.65],
    [2619, 1309.5, 7464.15, 935.36, 2.65],
    [2699, 1349.5, 7692.15, 963.93, 2.65],
    [2602, 1301.0, 7415.7, 929.29, 2.65],
    [2784, 1392.0, 7934.4, 994.29, 2.65],
    [2769, 1384.5, 7891.65, 988.93, 2.65],
    [2628, 1314.0, 7489.8, 938.57, 2.65],
    [2631, 1315.5, 7498.35, 939.64, 2.65],
    [2707, 1353.5, 7714.95, 966.79, 2.65],
    [2694, 1347.0, 7677.9, 962.14, 2.65],
    [2626, 1313.0, 7484.1, 937.86, 2.65],
    [2720, 1360.0, 7752.0, 971.43, 2.65],
  ],

  // Output发电量(kW)
  // Residual Electricity剩余电量(Kw)
  // Charge充电量(kW)
  BATTERY: [
    [0.0, 0, 2553],
    [0.0, 2553, 2553],
    [0.0, 5106, 2553],
    [0.0, 7659, 2553],
    [0.0, 10212, 2553],
    [0.0, 12765, 2553],
    [0.0, 15318, 0],
    [1196, 14122.0, 0],
    [279, 13843.0, 0],
    [109, 13734.0, 0],
    [1018, 12716.0, 0],
    [1154, 11562.0, 0],
    [909, 10653.0, 0],
    [937, 9716.0, 0],
    [1023, 8693.0, 0],
    [1019, 7674.0, 0],
    [986, 6688.0, 0],
    [937, 5751.0, 0],
    [1200, 4551.0, 0],
    [1098, 3453.0, 0],
    [1130, 2323.0, 0],
    [921, 1402.0, 0],
    [942, 460.0, 0],
    [460, 0.0, 0],
  ],
};

// 可变参数
export function realTimeMutableData(genre: string) {
  return mutableData[genre][new Date().getHours()];
}

// 固定参数
const immutableData = {
  // "Investment cost 投资成本"
  PHOTOVOLTAIC: [0.65, 0, 0.65],
  // "Investment cost 投资成本"
  WIND: [0.57, 0, 0.57],
  // "Investment cost 投资成本"
  // 燃料成本
  GAS: [0.6, 0.3, 0.9],
  // 投资成本Investment cost
  // 分时电价Electricity Price
  BATTERY: [0.58, 0.3766, 0.9566],
};

export function realTimeImmutableData(genre: string) {
  return immutableData[genre];
}

// 首页图表数据
const charts = {
  PHOTOVOLTAIC: [
    {
      time: '0:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 35.21,
    },
    {
      time: '1:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 37.68,
    },
    {
      time: '2:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 38.82,
    },
    {
      time: '3:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 38.84,
    },
    {
      time: '4:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 38.23,
    },
    {
      time: '5:00',
      Output: 182.66,
      Direct: 0,
      Diffuse: 35,
      Temperature: 37.98,
    },
    {
      time: '6:00',
      Output: 557.6,
      Direct: 1,
      Diffuse: 81,
      Temperature: 37.72,
    },
    {
      time: '7:00',
      Output: 1576.67,
      Direct: 19,
      Diffuse: 186,
      Temperature: 37.21,
    },
    {
      time: '8:00',
      Output: 3028.36,
      Direct: 70,
      Diffuse: 319,
      Temperature: 36.8,
    },
    {
      time: '9:00',
      Output: 3653.26,
      Direct: 87,
      Diffuse: 386,
      Temperature: 36.66,
    },
    {
      time: '10:00',
      Output: 3162.95,
      Direct: 37,
      Diffuse: 371,
      Temperature: 36.27,
    },
    {
      time: '11:00',
      Output: 2124.66,
      Direct: 10,
      Diffuse: 266,
      Temperature: 35.47,
    },
    {
      time: '12:00',
      Output: 1913.15,
      Direct: 8,
      Diffuse: 242,
      Temperature: 34.33,
    },
    {
      time: '13:00',
      Output: 1480.53,
      Direct: 4,
      Diffuse: 191,
      Temperature: 33.77,
    },
    {
      time: '14:00',
      Output: 1067.14,
      Direct: 3,
      Diffuse: 143,
      Temperature: 33.39,
    },
    {
      time: '15:00',
      Output: 999.84,
      Direct: 2,
      Diffuse: 134,
      Temperature: 32.92,
    },
    {
      time: '16:00',
      Output: 1288.25,
      Direct: 5,
      Diffuse: 166,
      Temperature: 32.42,
    },
    {
      time: '17:00',
      Output: 788.33,
      Direct: 2,
      Diffuse: 109,
      Temperature: 32,
    },
    {
      time: '18:00',
      Output: 307.64,
      Direct: 0,
      Diffuse: 52,
      Temperature: 31.8,
    },
    {
      time: '19:00',
      Output: 0,
      Direct: 0,
      Diffuse: 6,
      Temperature: 31.61,
    },
    {
      time: '20:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 31.46,
    },
    {
      time: '21:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 31.31,
    },
    {
      time: '22:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 31.36,
    },
    {
      time: '23:00',
      Output: 0,
      Direct: 0,
      Diffuse: 0,
      Temperature: 31.69,
    },
  ],
  WIND: [
    {
      time: '0:00',
      Output: 2750.86,
      speed: 341.4,
    },
    {
      time: '1:00',
      Output: 1353.6,
      speed: 273.6,
    },
    {
      time: '2:00',
      Output: 553.08,
      speed: 214.8,
    },
    {
      time: '3:00',
      Output: 261.99,
      speed: 181.8,
    },
    {
      time: '4:00',
      Output: 160.1,
      speed: 165.6,
    },
    {
      time: '5:00',
      Output: 203.77,
      speed: 172.2,
    },
    {
      time: '6:00',
      Output: 203.77,
      speed: 171.6,
    },
    {
      time: '7:00',
      Output: 145.55,
      speed: 160.8,
    },
    {
      time: '8:00',
      Output: 422.09,
      speed: 200.4,
    },
    {
      time: '9:00',
      Output: 756.85,
      speed: 232.2,
    },
    {
      time: '10:00',
      Output: 1062.5,
      speed: 254.4,
    },
    {
      time: '11:00',
      Output: 1164.38,
      speed: 261.6,
    },
    {
      time: '12:00',
      Output: 1149.83,
      speed: 261,
    },
    {
      time: '13:00',
      Output: 1397.26,
      speed: 276,
    },
    {
      time: '14:00',
      Output: 1761.13,
      speed: 295.8,
    },
    {
      time: '15:00',
      Output: 2037.67,
      speed: 309.6,
    },
    {
      time: '16:00',
      Output: 2066.78,
      speed: 311.4,
    },
    {
      time: '17:00',
      Output: 1979.45,
      speed: 307.2,
    },
    {
      time: '18:00',
      Output: 2314.21,
      speed: 322.8,
    },
    {
      time: '19:00',
      Output: 3231.17,
      speed: 360.6,
    },
    {
      time: '20:00',
      Output: 3653.26,
      speed: 375.6,
    },
    {
      time: '21:00',
      Output: 3158.39,
      speed: 357.6,
    },
    {
      time: '22:00',
      Output: 2328.77,
      speed: 323.4,
    },
    {
      time: '23:00',
      Output: 1644.69,
      speed: 289.8,
    },
  ],
  GAS: [
    {
      time: '0:00',
      Output: 2789,
      ColdLoad: 7948.65,
      ThermalLoad: 996.07,
    },
    {
      time: '1:00',
      Output: 2769,
      ColdLoad: 7891.65,
      ThermalLoad: 988.93,
    },
    {
      time: '2:00',
      Output: 2679,
      ColdLoad: 7635.15,
      ThermalLoad: 956.79,
    },
    {
      time: '3:00',
      Output: 2719,
      ColdLoad: 7749.15,
      ThermalLoad: 971.07,
    },
    {
      time: '4:00',
      Output: 2703,
      ColdLoad: 7703.55,
      ThermalLoad: 965.36,
    },
    {
      time: '5:00',
      Output: 2646,
      ColdLoad: 7541.1,
      ThermalLoad: 945.0,
    },
    {
      time: '6:00',
      Output: 2681,
      ColdLoad: 7640.85,
      ThermalLoad: 957.5,
    },
    {
      time: '7:00',
      Output: 2737,
      ColdLoad: 7800.45,
      ThermalLoad: 977.5,
    },
    {
      time: '8:00',
      Output: 2764,
      ColdLoad: 7877.4,
      ThermalLoad: 987.14,
    },
    {
      time: '9:00',
      Output: 2756,
      ColdLoad: 7854.6,
      ThermalLoad: 984.29,
    },
    {
      time: '10:00',
      Output: 2778,
      ColdLoad: 7917.3,
      ThermalLoad: 992.14,
    },
    {
      time: '11:00',
      Output: 2655,
      ColdLoad: 7566.75,
      ThermalLoad: 948.21,
    },
    {
      time: '12:00',
      Output: 2645,
      ColdLoad: 7538.25,
      ThermalLoad: 944.64,
    },
    {
      time: '13:00',
      Output: 2619,
      ColdLoad: 7464.15,
      ThermalLoad: 935.36,
    },
    {
      time: '14:00',
      Output: 2699,
      ColdLoad: 7692.15,
      ThermalLoad: 963.93,
    },
    {
      time: '14:00',
      Output: 2699,
      ColdLoad: 7692.15,
      ThermalLoad: 963.93,
    },
    {
      time: '15:00',
      Output: 2602,
      ColdLoad: 7415.7,
      ThermalLoad: 929.29,
    },
    {
      time: '17:00',
      Output: 2769,
      ColdLoad: 7891.65,
      ThermalLoad: 988.93,
    },

    {
      time: '18:00',
      Output: 2628,
      ColdLoad: 7489.8,
      ThermalLoad: 938.57,
    },
    {
      time: '19:00',
      Output: 2631,
      ColdLoad: 7498.35,
      ThermalLoad: 939.64,
    },
    {
      time: '20:00',
      Output: 2707,
      ColdLoad: 7714.95,
      ThermalLoad: 966.79,
    },
    {
      time: '21:00',
      Output: 2694,
      ColdLoad: 7677.9,
      ThermalLoad: 962.14,
    },
    {
      time: '22:00',
      Output: 2626,
      ColdLoad: 7484.1,
      ThermalLoad: 937.86,
    },
    {
      time: '23:00',
      Output: 2720,
      ColdLoad: 7752.0,
      ThermalLoad: 971.43,
    },
  ],
};

// function fill(begin: number) {
//   const ret = [];
//   for (let i = begin; i < 24; i++) {
//     ret.push({
//       time: ('0' + i).slice(-2) + ':00',
//       Output: 0,
//       Direct: 0,
//       Diffuse: 0,
//       Temperature: 0,
//     });
//   }
//   return ret;
// }

export function getChartsData(role: string) {
  const hour = new Date().getHours();
  let data;
  try {
    data = charts[role].slice(0, hour + 1);
  } catch (e) {
    data = charts.PHOTOVOLTAIC.slice(0, hour + 1);
  }
  return data;
}
