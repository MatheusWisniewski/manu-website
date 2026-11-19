/* Dedicated UKHSA Live Surveillance Explorer (England & UKHSA Regions, Multi-Metric, Multi-Chart) */

const UKHSA_BASE = "https://api.ukhsa-dashboard.data.gov.uk";

/* Verified 2026 UKHSA England & London Fallback Snapshot (from api.ukhsa-dashboard.data.gov.uk) */
export const UKHSA_SNAPSHOT = {"rsv|positivity|England":{"00-04":[["2026-08-17",1.3],["2026-08-24",0.46],["2026-08-31",0.49],["2026-09-07",3.15],["2026-09-14",3.35],["2026-09-21",1.56],["2026-09-28",3.39],["2026-10-05",6.84],["2026-10-12",5.87],["2026-10-19",8.92],["2026-10-26",16.83],["2026-11-02",17.48]],"05-14":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.52],["2026-10-12",0.6],["2026-10-19",1.57],["2026-10-26",1.11],["2026-11-02",3.03]],"15-44":[["2026-08-17",0.29],["2026-08-24",0.0],["2026-08-31",0.28],["2026-09-07",0.51],["2026-09-14",0.0],["2026-09-21",0.18],["2026-09-28",0.0],["2026-10-05",0.27],["2026-10-12",0.27],["2026-10-19",0.29],["2026-10-26",1.22],["2026-11-02",1.0]],"45-64":[["2026-08-17",0.0],["2026-08-24",0.26],["2026-08-31",0.0],["2026-09-07",0.63],["2026-09-14",1.8],["2026-09-21",0.0],["2026-09-28",1.4],["2026-10-05",0.13],["2026-10-12",0.24],["2026-10-19",0.35],["2026-10-26",0.72],["2026-11-02",0.38]],"65-79":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.14],["2026-09-28",0.0],["2026-10-05",0.19],["2026-10-12",0.19],["2026-10-19",0.27],["2026-10-26",0.47],["2026-11-02",0.81]],"80+":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.17],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.1],["2026-10-19",0.38],["2026-10-26",0.21],["2026-11-02",0.32]],"all":[["2026-08-17",0.2],["2026-08-24",0.11],["2026-08-31",0.11],["2026-09-07",0.61],["2026-09-14",0.81],["2026-09-21",0.29],["2026-09-28",0.65],["2026-10-05",0.83],["2026-10-12",0.92],["2026-10-19",1.61],["2026-10-26",2.89],["2026-11-02",3.2]]},"rsv|positivity|London":{"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]]},"flu|positivity|England":{"00-04":[["2026-08-17",2.61],["2026-08-24",0.46],["2026-08-31",2.44],["2026-09-07",1.74],["2026-09-14",2.74],["2026-09-21",2.34],["2026-09-28",3.15],["2026-10-05",5.83],["2026-10-12",5.84],["2026-10-19",6.97],["2026-10-26",5.36],["2026-11-02",6.31]],"05-14":[["2026-08-17",2.2],["2026-08-24",4.94],["2026-08-31",5.13],["2026-09-07",5.11],["2026-09-14",6.49],["2026-09-21",4.79],["2026-09-28",4.55],["2026-10-05",7.69],["2026-10-12",9.58],["2026-10-19",13.99],["2026-10-26",13.19],["2026-11-02",13.57]],"15-44":[["2026-08-17",4.34],["2026-08-24",3.94],["2026-08-31",4.42],["2026-09-07",5.13],["2026-09-14",7.11],["2026-09-21",13.88],["2026-09-28",13.51],["2026-10-05",10.58],["2026-10-12",8.75],["2026-10-19",7.09],["2026-10-26",9.14],["2026-11-02",10.07]],"45-64":[["2026-08-17",2.34],["2026-08-24",1.29],["2026-08-31",1.61],["2026-09-07",3.14],["2026-09-14",5.4],["2026-09-21",3.04],["2026-09-28",5.17],["2026-10-05",4.78],["2026-10-12",4.35],["2026-10-19",5.74],["2026-10-26",8.77],["2026-11-02",9.03]],"65-79":[["2026-08-17",1.81],["2026-08-24",2.73],["2026-08-31",1.96],["2026-09-07",3.28],["2026-09-14",3.45],["2026-09-21",4.84],["2026-09-28",3.96],["2026-10-05",5.58],["2026-10-12",5.82],["2026-10-19",5.92],["2026-10-26",6.72],["2026-11-02",6.21]],"80+":[["2026-08-17",0.51],["2026-08-24",2.03],["2026-08-31",1.61],["2026-09-07",3.07],["2026-09-14",2.85],["2026-09-21",2.56],["2026-09-28",3.21],["2026-10-05",5.63],["2026-10-12",4.32],["2026-10-19",5.16],["2026-10-26",6.44],["2026-11-02",6.28]],"all":[["2026-08-17",2.22],["2026-08-24",2.35],["2026-08-31",2.47],["2026-09-07",3.44],["2026-09-14",4.49],["2026-09-21",5.4],["2026-09-28",5.79],["2026-10-05",6.43],["2026-10-12",5.83],["2026-10-19",6.38],["2026-10-26",7.53],["2026-11-02",7.75]]},"flu|positivity|London":{"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",11.11],["2026-09-14",14.29],["2026-09-21",25.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",13.33],["2026-10-19",21.43],["2026-10-26",8.33],["2026-11-02",16.67]]},"rhino|positivity|England":{"00-04":[["2026-08-17",14.07],["2026-08-24",13.93],["2026-08-31",20.45],["2026-09-07",28.89],["2026-09-14",30.57],["2026-09-21",42.62],["2026-09-28",40.0],["2026-10-05",35.23],["2026-10-12",31.55],["2026-10-19",30.59],["2026-10-26",32.96],["2026-11-02",28.42]],"05-14":[["2026-08-17",8.33],["2026-08-24",8.16],["2026-08-31",13.46],["2026-09-07",11.48],["2026-09-14",26.67],["2026-09-21",36.9],["2026-09-28",28.4],["2026-10-05",30.95],["2026-10-12",35.71],["2026-10-19",21.21],["2026-10-26",22.64],["2026-11-02",15.52]],"15-44":[["2026-08-17",11.18],["2026-08-24",8.78],["2026-08-31",6.1],["2026-09-07",7.1],["2026-09-14",11.92],["2026-09-21",21.62],["2026-09-28",24.7],["2026-10-05",19.58],["2026-10-12",23.97],["2026-10-19",19.38],["2026-10-26",15.85],["2026-11-02",11.46]],"45-64":[["2026-08-17",3.86],["2026-08-24",3.85],["2026-08-31",2.65],["2026-09-07",8.2],["2026-09-14",10.15],["2026-09-21",10.04],["2026-09-28",15.66],["2026-10-05",13.03],["2026-10-12",13.75],["2026-10-19",15.38],["2026-10-26",14.47],["2026-11-02",11.48]],"65-79":[["2026-08-17",4.62],["2026-08-24",3.56],["2026-08-31",6.23],["2026-09-07",6.2],["2026-09-14",8.56],["2026-09-21",12.23],["2026-09-28",13.08],["2026-10-05",18.66],["2026-10-12",15.28],["2026-10-19",11.73],["2026-10-26",12.12],["2026-11-02",11.34]],"80+":[["2026-08-17",4.37],["2026-08-24",8.16],["2026-08-31",1.69],["2026-09-07",5.88],["2026-09-14",12.18],["2026-09-21",10.19],["2026-09-28",12.85],["2026-10-05",16.92],["2026-10-12",10.67],["2026-10-19",12.5],["2026-10-26",9.17],["2026-11-02",11.24]],"all":[["2026-08-17",6.88],["2026-08-24",6.99],["2026-08-31",7.0],["2026-09-07",10.03],["2026-09-14",14.31],["2026-09-21",18.9],["2026-09-28",19.57],["2026-10-05",20.04],["2026-10-12",18.27],["2026-10-19",17.46],["2026-10-26",16.07],["2026-11-02",14.11]]},"rhino|positivity|London":{"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",33.33],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",20.0],["2026-11-02",50.0]]},"adeno|positivity|England":{"00-04":[["2026-08-17",4.05],["2026-08-24",1.27],["2026-08-31",3.95],["2026-09-07",2.98],["2026-09-14",1.38],["2026-09-21",3.14],["2026-09-28",4.49],["2026-10-05",8.3],["2026-10-12",4.27],["2026-10-19",5.01],["2026-10-26",7.9],["2026-11-02",5.37]],"05-14":[["2026-08-17",4.67],["2026-08-24",4.76],["2026-08-31",4.26],["2026-09-07",7.21],["2026-09-14",5.04],["2026-09-21",3.39],["2026-09-28",1.6],["2026-10-05",2.46],["2026-10-12",5.31],["2026-10-19",4.84],["2026-10-26",6.86],["2026-11-02",5.61]],"15-44":[["2026-08-17",0.72],["2026-08-24",1.98],["2026-08-31",0.98],["2026-09-07",1.64],["2026-09-14",0.93],["2026-09-21",1.74],["2026-09-28",1.9],["2026-10-05",0.27],["2026-10-12",1.96],["2026-10-19",0.87],["2026-10-26",1.76],["2026-11-02",0.93]],"45-64":[["2026-08-17",0.81],["2026-08-24",0.31],["2026-08-31",0.31],["2026-09-07",1.86],["2026-09-14",1.74],["2026-09-21",0.9],["2026-09-28",2.22],["2026-10-05",1.08],["2026-10-12",0.19],["2026-10-19",1.27],["2026-10-26",0.4],["2026-11-02",2.51]],"65-79":[["2026-08-17",0.0],["2026-08-24",0.77],["2026-08-31",1.18],["2026-09-07",1.18],["2026-09-14",0.25],["2026-09-21",0.42],["2026-09-28",0.52],["2026-10-05",0.0],["2026-10-12",0.17],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]],"80+":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.55],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.25],["2026-10-26",0.0],["2026-11-02",0.0]],"all":[["2026-08-17",1.05],["2026-08-24",1.05],["2026-08-31",1.26],["2026-09-07",1.83],["2026-09-14",1.13],["2026-09-21",1.27],["2026-09-28",1.52],["2026-10-05",1.27],["2026-10-12",1.17],["2026-10-19",1.49],["2026-10-26",1.78],["2026-11-02",1.76]]},"adeno|positivity|London":{"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]]},"hmpv|positivity|England":{"00-04":[["2026-08-17",1.2],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.55],["2026-09-14",0.0],["2026-09-21",0.83],["2026-09-28",0.0],["2026-10-05",0.45],["2026-10-12",1.52],["2026-10-19",0.35],["2026-10-26",2.04],["2026-11-02",0.0]],"05-14":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.98],["2026-09-21",0.82],["2026-09-28",0.88],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",1.12],["2026-11-02",0.0]],"15-44":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.41],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.35],["2026-10-26",0.6],["2026-11-02",0.0]],"45-64":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",6.99],["2026-09-21",0.0],["2026-09-28",1.65],["2026-10-05",0.31],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]],"65-79":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.24],["2026-10-05",0.26],["2026-10-12",0.24],["2026-10-19",0.0],["2026-10-26",0.85],["2026-11-02",0.3]],"80+":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.3],["2026-10-05",0.29],["2026-10-12",1.21],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]],"all":[["2026-08-17",0.18],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.08],["2026-09-14",1.67],["2026-09-21",0.2],["2026-09-28",0.51],["2026-10-05",0.24],["2026-10-12",0.5],["2026-10-19",0.13],["2026-10-26",0.67],["2026-11-02",0.07]]},"hmpv|positivity|London":{"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.0],["2026-10-19",0.0],["2026-10-26",0.0],["2026-11-02",0.0]]},"covid|positivity|England":{"all":[["2026-08-24",2.95],["2026-08-31",3.72],["2026-09-07",5.02],["2026-09-14",6.37],["2026-09-21",7.51],["2026-09-28",8.82],["2026-10-05",9.36],["2026-10-12",9.35],["2026-10-19",9.1],["2026-10-26",8.2],["2026-11-02",7.58],["2026-11-09",7.6]]},"covid|positivity|London":{"all":[["2026-08-24",4.05],["2026-08-31",6.37],["2026-09-07",6.61],["2026-09-14",7.2],["2026-09-21",9.13],["2026-09-28",10.36],["2026-10-05",10.52],["2026-10-12",9.05],["2026-10-19",7.65],["2026-10-26",6.37],["2026-11-02",5.07],["2026-11-09",6.68]]},"covid|admissions|England":{"all":[["2026-08-15",31.43],["2026-08-22",30.86],["2026-08-29",35.0],["2026-09-05",48.57],["2026-09-12",70.86],["2026-09-19",111.29],["2026-09-26",138.57],["2026-10-03",186.29],["2026-10-10",205.71],["2026-10-17",231.43],["2026-10-24",219.29],["2026-10-31",201.71]]},"rsv|admissions|England":{"00-04":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.71],["2026-09-07",1.33],["2026-09-14",2.28],["2026-09-21",2.32],["2026-09-28",2.73],["2026-10-05",4.95],["2026-10-12",5.48],["2026-10-19",7.88],["2026-10-26",12.76],["2026-11-02",18.18]],"05-14":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.07],["2026-10-12",0.1],["2026-10-19",0.08],["2026-10-26",0.22],["2026-11-02",0.33]],"15-44":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.08],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.03],["2026-10-12",0.0],["2026-10-19",0.06],["2026-10-26",0.03],["2026-11-02",0.04]],"45-54":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.13],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.1],["2026-10-12",0.0],["2026-10-19",0.1],["2026-10-26",0.1],["2026-11-02",0.23]],"55-64":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.22],["2026-10-19",0.2],["2026-10-26",0.2],["2026-11-02",0.24]],"65-74":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.15],["2026-10-19",0.26],["2026-10-26",0.4],["2026-11-02",0.47]],"75-84":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.24],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.25],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.22],["2026-10-19",0.4],["2026-10-26",0.2],["2026-11-02",1.17]],"85+":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.0],["2026-09-07",0.0],["2026-09-14",0.0],["2026-09-21",0.0],["2026-09-28",0.0],["2026-10-05",0.0],["2026-10-12",0.59],["2026-10-19",1.59],["2026-10-26",0.0],["2026-11-02",0.62]],"all":[["2026-08-17",0.0],["2026-08-24",0.0],["2026-08-31",0.06],["2026-09-07",0.13],["2026-09-14",0.14],["2026-09-21",0.16],["2026-09-28",0.16],["2026-10-05",0.34],["2026-10-12",0.39],["2026-10-19",0.61],["2026-10-26",0.89],["2026-11-02",1.3]]},"flu|admissions|England":{"00-04":[["2026-08-17",0.73],["2026-08-24",2.11],["2026-08-31",0.42],["2026-09-07",1.07],["2026-09-14",1.7],["2026-09-21",1.28],["2026-09-28",1.88],["2026-10-05",2.29],["2026-10-12",3.22],["2026-10-19",4.13],["2026-10-26",5.25],["2026-11-02",6.63]],"05-14":[["2026-08-17",0.61],["2026-08-24",0.2],["2026-08-31",0.09],["2026-09-07",0.18],["2026-09-14",0.21],["2026-09-21",0.26],["2026-09-28",0.44],["2026-10-05",0.34],["2026-10-12",0.89],["2026-10-19",0.99],["2026-10-26",0.93],["2026-11-02",1.0]],"15-44":[["2026-08-17",0.22],["2026-08-24",0.55],["2026-08-31",0.75],["2026-09-07",0.7],["2026-09-14",0.37],["2026-09-21",0.67],["2026-09-28",0.82],["2026-10-05",0.85],["2026-10-12",0.8],["2026-10-19",0.62],["2026-10-26",1.24],["2026-11-02",1.37]],"45-54":[["2026-08-17",0.32],["2026-08-24",0.0],["2026-08-31",0.18],["2026-09-07",0.18],["2026-09-14",0.23],["2026-09-21",0.82],["2026-09-28",0.82],["2026-10-05",0.8],["2026-10-12",1.12],["2026-10-19",0.96],["2026-10-26",1.18],["2026-11-02",1.74]],"55-64":[["2026-08-17",1.03],["2026-08-24",0.89],["2026-08-31",0.09],["2026-09-07",0.55],["2026-09-14",1.0],["2026-09-21",0.98],["2026-09-28",1.63],["2026-10-05",2.0],["2026-10-12",2.01],["2026-10-19",2.42],["2026-10-26",2.98],["2026-11-02",3.63]],"65-74":[["2026-08-17",0.48],["2026-08-24",0.0],["2026-08-31",0.38],["2026-09-07",0.74],["2026-09-14",0.71],["2026-09-21",2.29],["2026-09-28",2.81],["2026-10-05",3.97],["2026-10-12",4.6],["2026-10-19",5.09],["2026-10-26",4.92],["2026-11-02",5.77]],"75-84":[["2026-08-17",2.19],["2026-08-24",1.82],["2026-08-31",1.41],["2026-09-07",2.3],["2026-09-14",1.09],["2026-09-21",3.46],["2026-09-28",5.58],["2026-10-05",7.95],["2026-10-12",8.93],["2026-10-19",9.1],["2026-10-26",9.55],["2026-11-02",13.06]],"85+":[["2026-08-17",0.0],["2026-08-24",3.86],["2026-08-31",0.0],["2026-09-07",2.28],["2026-09-14",4.53],["2026-09-21",4.55],["2026-09-28",9.08],["2026-10-05",11.68],["2026-10-12",15.37],["2026-10-19",14.25],["2026-10-26",21.17],["2026-11-02",22.55]],"all":[["2026-08-17",0.55],["2026-08-24",0.67],["2026-08-31",0.49],["2026-09-07",0.7],["2026-09-14",0.64],["2026-09-21",1.11],["2026-09-28",1.66],["2026-10-05",2.06],["2026-10-12",2.45],["2026-10-19",2.49],["2026-10-26",3.0],["2026-11-02",3.65]]}};

export const PATHOGENS = {
  rsv: {
    topic: "RSV",
    color: "#0b5f6b",
    label: { en: "RSV", pt: "VSR" },
    metrics: {
      positivity: { name: "RSV_testing_positivityByWeek", regional: true, unit: "%", isDaily: false, ageBand: "pos" },
      admissions: { name: "RSV_healthcare_admissionRateByWeek", regional: false, unit: "/100k", isDaily: false, ageBand: "adm" },
    },
  },
  flu: {
    topic: "Influenza",
    color: "#1b2a5a",
    label: { en: "Influenza", pt: "Influenza" },
    metrics: {
      positivity: { name: "influenza_testing_positivityByWeek", regional: true, unit: "%", isDaily: false, ageBand: "pos" },
      admissions: { name: "influenza_healthcare_hospitalAdmissionRateByWeek", regional: true, unit: "/100k", isDaily: false, ageBand: "adm" },
      icu: { name: "influenza_healthcare_ICUHDUadmissionRateByWeek", regional: true, unit: "/100k", isDaily: false, ageBand: "adm" },
    },
  },
  covid: {
    topic: "COVID-19",
    color: "#d97706",
    label: { en: "COVID-19", pt: "COVID-19" },
    metrics: {
      positivity: { name: "COVID-19_testing_positivity7DayRolling", regional: true, unit: "%", isDaily: true, ageBand: "allOnly" },
      admissions: { name: "COVID-19_healthcare_admissionRollingMean", regional: false, unit: "/day", isDaily: true, ageBand: "allOnly" },
    },
  },
  rhino: {
    topic: "Rhinovirus",
    color: "#dc4a38",
    label: { en: "Rhinovirus", pt: "Rinovírus" },
    metrics: {
      positivity: { name: "rhinovirus_testing_positivityByWeek", regional: true, unit: "%", isDaily: false, ageBand: "pos" },
    },
  },
  adeno: {
    topic: "Adenovirus",
    color: "#7c3aed",
    label: { en: "Adenovirus", pt: "Adenovírus" },
    metrics: {
      positivity: { name: "adenovirus_testing_positivityByWeek", regional: true, unit: "%", isDaily: false, ageBand: "pos" },
    },
  },
  hmpv: {
    topic: "hMPV",
    color: "#059669",
    label: { en: "hMPV", pt: "hMPV" },
    metrics: {
      positivity: { name: "hMPV_testing_positivityByWeek", regional: true, unit: "%", isDaily: false, ageBand: "pos" },
    },
  },
};

const PATHOGEN_ORDER = ["rsv", "flu", "covid", "rhino", "adeno", "hmpv"];

const REGIONS = [
  { id: "England", type: "Nation", en: "England (National)", pt: "Inglaterra (Nacional)", shortEn: "England", shortPt: "Inglaterra" },
  { id: "London", type: "UKHSA Region", en: "London", pt: "Londres", shortEn: "London", shortPt: "Londres" },
  { id: "East Midlands", type: "UKHSA Region", en: "East Midlands", pt: "East Midlands", shortEn: "East Midlands", shortPt: "East Midlands" },
  { id: "East of England", type: "UKHSA Region", en: "East of England", pt: "Leste da Inglaterra", shortEn: "East of England", shortPt: "Leste da Inglaterra" },
  { id: "North East", type: "UKHSA Region", en: "North East", pt: "Nordeste", shortEn: "North East", shortPt: "Nordeste" },
  { id: "North West", type: "UKHSA Region", en: "North West", pt: "Noroeste", shortEn: "North West", shortPt: "Noroeste" },
  { id: "South East", type: "UKHSA Region", en: "South East", pt: "Sudeste", shortEn: "South East", shortPt: "Sudeste" },
  { id: "South West", type: "UKHSA Region", en: "South West", pt: "Sudoeste", shortEn: "South West", shortPt: "Sudoeste" },
  { id: "West Midlands", type: "UKHSA Region", en: "West Midlands", pt: "West Midlands", shortEn: "West Midlands", shortPt: "West Midlands" },
  { id: "Yorkshire and Humber", type: "UKHSA Region", en: "Yorkshire & Humber", pt: "Yorkshire e Humber", shortEn: "Yorkshire & Humber", shortPt: "Yorkshire e Humber" },
];

const AGE_GROUPS = {
  pos: ["00-04", "05-14", "15-44", "45-64", "65-79", "80+", "all"],
  adm: ["00-04", "05-14", "15-44", "45-54", "55-64", "65-74", "75-84", "85+", "all"],
  allOnly: ["all"],
};

const AGE_COLORS = {
  "00-04": "#0b5f6b",
  "05-14": "#059669",
  "15-44": "#d97706",
  "45-54": "#7c3aed",
  "45-64": "#7c3aed",
  "55-64": "#0284c7",
  "65-74": "#dc4a38",
  "65-79": "#dc4a38",
  "75-84": "#be185d",
  "80+": "#b45309",
  "85+": "#b45309",
  all: "#1b2a5a",
};

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
};

const COPY = {
  en: {
    live: "Live API",
    snapshot: "2026 Snapshot",
    loading: "Syncing…",
    compareBtn: "Compare pathogens",
    compareActive: "Comparing pathogens",
    pathogensLbl: "Pathogens to compare",
    ageLbl: "Age cohorts",
    regionAgeLbl: "Regional cohort",
    engBaseline: "vs England baseline",
    allAges: "All ages",
    u5Chip: "00–04 yrs",
    ageUnit: "yrs",
    metricNames: {
      positivity: "Test positivity (%)",
      admissionsRate: "Hospital admissions (/100k)",
      admissionsCount: "Daily admissions (rolling mean /day)",
      icu: "ICU / HDU admissions (/100k)",
    },
    unitLabel: { "%": "%", "/100k": "per 100k", "/day": "/day" },
    unitShort: { "%": "%", "/100k": "/100k", "/day": "/day" },
    deltaPp: "pp",
    kpiLatest: "Latest",
    kpiPeak: "Period peak",
    kpiMean: "Period average",
    kpiRatio: "Under-5 vs All ages",
    kpiBaseline: "vs England",
    kpiLead: "Highest active",
    kpiSpread: "Period range",
    weeks: (n) => `${n} ${n === 1 ? "week" : "weeks"}`,
    rollingAvgLeg: "4-wk rolling avg",
    meanRef: (v) => `Mean ${v}`,
    datePrefix: "Latest data:",
    snapshotNote: "Offline snapshot fallback shows the 12-week England & London 2026 baseline. Click refresh when online for full regions and timeframes.",
    covidAgeNote: "UKHSA reports this COVID-19 indicator for all ages combined.",
    regionAgeNote: (r) => `UKHSA publishes ${r} data for all ages combined. Toggle England baseline to compare regionally.`,
    compareNotePos: "Comparing test positivity (%) across selected respiratory pathogens.",
    compareNoteAdm: "Comparing hospital admission rates (/100k). COVID-19 uses daily counts (/day) so it is excluded to preserve Y-axis scale integrity.",
    noData: "Live UKHSA API unavailable for this region/timeframe offline. Switch to England or London for cached 2026 data, or refresh online.",
    calloutRatio: (p, g, u5, all, ratio) => `In ${g}, paediatric (00–04 yrs) ${p} (${u5}) is currently ${ratio}× the all-age rate (${all}).`,
    calloutRegion: (p, r, rv, ev, diff) => `${r} ${p} (${rv}) is ${diff} compared with the England national baseline (${ev}).`,
    calloutCompare: (lead, val, g) => `${lead} currently leads selected respiratory indicators in ${g} at ${val}.`,
    calloutTrend: (p, g, v, d) => `Latest ${p} reading in ${g}: ${v} (week-on-week ${d}).`,
    same: "in line",
    above: (d) => `${d} above`,
    below: (d) => `${d} below`,
  },
  pt: {
    live: "API ao vivo",
    snapshot: "Resumo 2026",
    loading: "Sincronizando…",
    compareBtn: "Comparar patógenos",
    compareActive: "Comparando patógenos",
    pathogensLbl: "Patógenos para comparar",
    ageLbl: "Faixas etárias",
    regionAgeLbl: "Coorte regional",
    engBaseline: "vs base Inglaterra",
    allAges: "Todas as idades",
    u5Chip: "00–04 anos",
    ageUnit: "anos",
    metricNames: {
      positivity: "Positividade de testes (%)",
      admissionsRate: "Internações hospitalares (/100 mil)",
      admissionsCount: "Internações diárias (média móvel /dia)",
      icu: "Internações em UTI (/100 mil)",
    },
    unitLabel: { "%": "%", "/100k": "por 100 mil", "/day": "/dia" },
    unitShort: { "%": "%", "/100k": "/100k", "/day": "/dia" },
    deltaPp: "pp",
    kpiLatest: "Último dado",
    kpiPeak: "Pico no período",
    kpiMean: "Média do período",
    kpiRatio: "Menores de 5 vs Geral",
    kpiBaseline: "vs Inglaterra",
    kpiLead: "Maior índice ativo",
    kpiSpread: "Amplitude no período",
    weeks: (n) => `${n} ${n === 1 ? "semana" : "semanas"}`,
    rollingAvgLeg: "Média móvel 4 sem.",
    meanRef: (v) => `Média ${v}`,
    datePrefix: "Dado mais recente:",
    snapshotNote: "O modo offline exibe a base verificada de 12 semanas (2026) para Inglaterra e Londres. Atualize online para todas as regiões e janelas.",
    covidAgeNote: "A UKHSA divulga este indicador de COVID-19 apenas para todas as idades combinadas.",
    regionAgeNote: (r) => `A UKHSA publica dados de ${r} para todas as idades. Ative a linha da Inglaterra para comparar com a média nacional.`,
    compareNotePos: "Comparando positividade semanal (%) entre os patógenos selecionados.",
    compareNoteAdm: "Comparando taxa de internações (/100 mil). COVID-19 usa contagem diária (/dia) e fica de fora para manter a integridade da escala.",
    noData: "API da UKHSA indisponível offline para esta região/janela. Selecione Inglaterra ou Londres para ver os dados em cache de 2026.",
    calloutRatio: (p, g, u5, all, ratio) => `Em ${g}, ${p} em menores de 5 anos (${u5}) está ${ratio}× acima da média geral (${all}).`,
    calloutRegion: (p, r, rv, ev, diff) => `${p} em ${r} (${rv}) está ${diff} da média nacional da Inglaterra (${ev}).`,
    calloutCompare: (lead, val, g) => `${lead} apresenta atualmente o maior nível entre os indicadores selecionados em ${g}: ${val}.`,
    calloutTrend: (p, g, v, d) => `Último registro de ${p} em ${g}: ${v} (variação semanal ${d}).`,
    same: "alinhado",
    above: (d) => `${d} acima`,
    below: (d) => `${d} abaixo`,
  },
};

/* ---------- Pure Math & Alignment Helpers (also unit-tested in Node) ---------- */
export function alignMondaySeries(points, targetWeeks = null) {
  if (!Array.isArray(points) || !points.length) return [];
  const mondays = points.filter(([d]) => {
    const dt = new Date(`${d}T00:00:00Z`);
    return !Number.isNaN(dt.getTime()) && dt.getUTCDay() === 1;
  });
  let base = mondays.length >= 4 ? mondays : null;
  if (!base) {
    base = [];
    for (let i = points.length - 1; i >= 0; i -= 7) base.push(points[i]);
    base.reverse();
  }
  return targetWeeks ? base.slice(-targetWeeks) : base;
}

export function computeRollingMean(values, windowSize = 4) {
  return values.map((_, idx) => {
    const start = Math.max(0, idx - windowSize + 1);
    let sum = 0, count = 0;
    for (let k = start; k <= idx; k++) {
      if (Number.isFinite(values[k])) {
        sum += values[k];
        count++;
      }
    }
    return count > 0 ? sum / count : null;
  });
}

export function niceScale(minVal, maxVal, autoScale = false) {
  const safeMax = Number.isFinite(maxVal) ? maxVal : 5;
  const safeMin = Number.isFinite(minVal) ? minVal : 0;
  let lo = 0;
  let hi = Math.max(safeMax, 2);

  if (autoScale && safeMax > safeMin) {
    const span = safeMax - safeMin;
    const pad = Math.max(span * 0.14, 0.3);
    lo = Math.max(0, safeMin - pad);
    hi = safeMax + pad;
  } else {
    hi = Math.max(safeMax, safeMax === 0 ? 5 : 1.5);
  }

  const rawRange = Math.max(hi - lo, 0.5);
  const rawStep = rawRange / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / pow;
  const niceNorm = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  const step = niceNorm * pow;

  const yMin = autoScale ? Math.max(0, Math.floor(lo / step) * step) : 0;
  let yMax = Math.ceil(hi / step) * step;
  if (yMax <= yMin) yMax = yMin + step * 4;

  const ticks = [];
  const count = Math.min(8, Math.round((yMax - yMin) / step));
  for (let i = 0; i <= count; i++) ticks.push(Number((yMin + i * step).toFixed(4)));
  return { yMin, yMax: ticks[ticks.length - 1], step, ticks };
}

export function buildMonotonePath(pts, clampMinY = -Infinity, clampMaxY = Infinity) {
  const n = pts.length;
  if (n < 2) return "";
  if (n === 2) {
    return `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} L${pts[1][0].toFixed(1)},${pts[1][1].toFixed(1)}`;
  }

  const dx = [];
  const d = [];
  for (let i = 0; i < n - 1; i++) {
    const h = Math.max(0.001, pts[i + 1][0] - pts[i][0]);
    dx.push(h);
    d.push((pts[i + 1][1] - pts[i][1]) / h);
  }

  const m = new Array(n).fill(0);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) {
      m[i] = 0;
    } else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }

  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(d[i]) < 1e-9) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const a = m[i] / d[i];
      const b = m[i + 1] / d[i];
      const s = a * a + b * b;
      if (s > 9) {
        const t = 3 / Math.sqrt(s);
        m[i] = t * a * d[i];
        m[i + 1] = t * b * d[i];
      }
    }
  }

  const clampY = (y) => Math.max(clampMinY, Math.min(clampMaxY, y));
  let path = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i];
    const cp1x = pts[i][0] + h / 3;
    const cp1y = clampY(pts[i][1] + (m[i] * h) / 3);
    const cp2x = pts[i + 1][0] - h / 3;
    const cp2y = clampY(pts[i + 1][1] - (m[i + 1] * h) / 3);
    path += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${pts[i + 1][0].toFixed(1)},${pts[i + 1][1].toFixed(1)}`;
  }
  return path;
}

/* ---------- Browser Application ---------- */
if (typeof document !== "undefined") {
  (() => {
    const sec = document.getElementById("surveillance");
    if (!sec) return;

    const elPathogenTabs = [...sec.querySelectorAll(".surv-tab")];
    const elCompareBtn = document.getElementById("survCompareBtn");
    const elMetricSel = document.getElementById("survMetric");
    const elGeoSel = document.getElementById("survGeo");
    const elRangeBtns = [...sec.querySelectorAll("#survRange .surv-seg-btn")];
    const elCohortLbl = document.getElementById("survCohortLbl");
    const elCohortChips = document.getElementById("survCohortChips");
    const elFilterNote = document.getElementById("survFilterNote");
    const elKpis = document.getElementById("survKpis");
    const elCallout = document.getElementById("survCallout");
    const elTypeBtns = [...sec.querySelectorAll("#survChartType .surv-type-btn")];
    const elOptSmooth = document.getElementById("optSmooth");
    const elOptMarkers = document.getElementById("optMarkers");
    const elOptAvg = document.getElementById("optAvg");
    const elOptMean = document.getElementById("optMean");
    const elOptAutoScale = document.getElementById("optAutoScale");
    const elLegend = document.getElementById("survLegend");
    const elHoverReadout = document.getElementById("survHoverReadout");
    const elStage = document.getElementById("survChartStage");
    const elChart = document.getElementById("survChart");
    const elTooltip = document.getElementById("survTooltip");
    const elEmpty = document.getElementById("survEmpty");
    const elStatus = document.getElementById("ukhsaStatus");
    const elRefresh = document.getElementById("ukhsaRefresh");
    const elDate = document.getElementById("ukhsaDate");
    const elExportCsv = document.getElementById("survExportCsv");

    const state = {
      compareMode: false,
      pathogen: "rsv",
      comparePathogens: ["rsv", "flu", "covid", "rhino"],
      compareAge: "all",
      metric: "positivity",
      geo: "England",
      showEnglandBaseline: true,
      range: "12w",
      selectedAges: ["00-04", "all"],
      chartType: "area",
      smooth: true,
      markers: true,
      rollingAvg: false,
      meanLine: false,
      autoScale: false,
      highlightedKey: null,
      activeIdx: -1,
    };

    const yearCache = new Map();
    const inFlight = new Map();
    let isRefreshing = false;
    let renderSeq = 0;
    let lastRendered = null;
    let chartGeoMeta = { padL: 48, padR: 18, padT: 16, padB: 30, plotW: 814, plotH: 284, width: 880, height: 330, pointsX: [] };

    const getLang = () => (window.i18n && window.i18n.lang === "pt" ? "pt" : "en");
    const getRegionMeta = (id) => REGIONS.find((r) => r.id === id) || REGIONS[0];
    const getRegionName = (id, short = false) => {
      const r = getRegionMeta(id);
      const l = getLang();
      return short ? (l === "pt" ? r.shortPt : r.shortEn) : (l === "pt" ? r.pt : r.en);
    };
    const getPathogenName = (id) => PATHOGENS[id].label[getLang()];

    const formatNumber = (val, decimals = 1) => {
      const s = val.toFixed(decimals);
      return getLang() === "pt" ? s.replace(".", ",") : s;
    };

    const formatAgeLabel = (age) => {
      const c = COPY[getLang()];
      if (age === "all") return c.allAges;
      const sep = age.includes("+") ? "" : ` ${c.ageUnit}`;
      return `${age.replace("-", "–")}${sep}`;
    };

    const formatAxisDate = (iso, withYear = false) => {
      const [y, m, d] = iso.split("-").map(Number);
      const mon = MONTHS[getLang()][(m || 1) - 1] || "";
      return withYear ? `${d} ${mon} '${String(y).slice(-2)}` : `${d} ${mon}`;
    };

    const formatValue = (val, unit) => {
      if (!Number.isFinite(val)) return "—";
      const dec = unit === "/day" && val >= 100 ? 0 : unit === "/100k" && val < 1 ? 2 : 1;
      const num = formatNumber(val, dec);
      if (unit === "%") return `${num}%`;
      return `${num} ${COPY[getLang()].unitShort[unit] || unit}`;
    };

    const formatDelta = (delta, unit) => {
      if (!Number.isFinite(delta)) return "—";
      const sign = delta > 0.005 ? "+" : "";
      const dec = unit === "/day" && Math.abs(delta) >= 50 ? 0 : unit === "/100k" && Math.abs(delta) < 1 ? 2 : 1;
      const num = formatNumber(delta, dec);
      const u = unit === "%" ? COPY[getLang()].deltaPp : (COPY[getLang()].unitShort[unit] || unit);
      return `${sign}${num} ${u}`;
    };

    function getMetricUnit(pathogenId, metricId) {
      if (state.compareMode && metricId === "admissions") return "/100k";
      return PATHOGENS[pathogenId]?.metrics[metricId]?.unit || "%";
    }

    function isMetricSupported(pathogenId, metricId, geoId, compareMode = state.compareMode) {
      if (compareMode) {
        if (metricId === "positivity") return true;
        if (metricId === "admissions") return geoId === "England";
        return false;
      }
      const m = PATHOGENS[pathogenId]?.metrics[metricId];
      if (!m) return false;
      if (geoId !== "England" && !m.regional) return false;
      return true;
    }

    function getCompareEligiblePathogens() {
      if (state.metric === "admissions") return ["rsv", "flu"];
      return PATHOGEN_ORDER;
    }

    /* ---------- Network Fetch + Year Rollover + Verified Snapshot ---------- */
    async function fetchPaginatedYear(url, signal) {
      const allRows = [];
      let nextUrl = url;
      for (let page = 0; nextUrl && page < 5; page++) {
        const parsed = new URL(nextUrl);
        if (parsed.origin !== UKHSA_BASE) break;
        const res = await fetch(parsed.toString(), { signal, cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data.results)) allRows.push(...data.results);
        nextUrl = typeof data.next === "string" ? data.next : null;
      }
      return allRows;
    }

    function parseYearRows(rows, isDaily) {
      const byAge = {};
      for (const r of rows) {
        if (
          r.stratum === "default" &&
          r.sex === "all" &&
          typeof r.age === "string" &&
          typeof r.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(r.date) &&
          Number.isFinite(r.metric_value)
        ) {
          if (!byAge[r.age]) byAge[r.age] = new Map();
          byAge[r.age].set(r.date, r.metric_value);
        }
      }
      const ages = {};
      for (const [age, map] of Object.entries(byAge)) {
        const sorted = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
        ages[age] = isDaily ? alignMondaySeries(sorted) : sorted;
      }
      return ages;
    }

    async function fetchTopicYear(pathogenId, metricId, geoId, year) {
      const key = `${pathogenId}|${metricId}|${geoId}|${year}`;
      if (yearCache.has(key)) return yearCache.get(key);
      if (inFlight.has(key)) return inFlight.get(key);

      const mDef = PATHOGENS[pathogenId]?.metrics[metricId];
      if (!mDef) return null;
      const reg = getRegionMeta(geoId);
      const url = `${UKHSA_BASE}/themes/infectious_disease/sub_themes/respiratory/topics/${encodeURIComponent(PATHOGENS[pathogenId].topic)}/geography_types/${encodeURIComponent(reg.type)}/geographies/${encodeURIComponent(reg.id)}/metrics/${encodeURIComponent(mDef.name)}?year=${year}&page_size=365`;

      const p = (async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 7500);
        try {
          const rows = await fetchPaginatedYear(url, controller.signal);
          const ages = parseYearRows(rows, mDef.isDaily);
          yearCache.set(key, ages);
          return ages;
        } finally {
          clearTimeout(timer);
          inFlight.delete(key);
        }
      })();
      inFlight.set(key, p);
      return p;
    }

    function mergeAgeMaps(older, newer) {
      const merged = {};
      const keys = new Set([...Object.keys(older || {}), ...Object.keys(newer || {})]);
      for (const age of keys) {
        const m = new Map();
        for (const [d, v] of (older?.[age] || [])) m.set(d, v);
        for (const [d, v] of (newer?.[age] || [])) m.set(d, v);
        merged[age] = [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
      }
      return merged;
    }

    function sliceByRange(agesObj, range) {
      const out = {};
      const targetN = range === "12w" ? 12 : range === "26w" ? 26 : range === "52w" ? 52 : null;
      for (const [age, pts] of Object.entries(agesObj)) {
        if (!pts.length) continue;
        if (range === "ytd") {
          const latestYear = pts[pts.length - 1][0].slice(0, 4);
          const ytdPts = pts.filter(([d]) => d.startsWith(`${latestYear}-`));
          out[age] = ytdPts.length ? ytdPts : pts.slice(-12);
        } else {
          out[age] = pts.slice(-targetN);
        }
      }
      return out;
    }

    async function loadSeriesData(pathogenId, metricId, geoId, range) {
      const targetN = range === "12w" ? 12 : range === "26w" ? 26 : range === "52w" ? 52 : 12;
      const nowYear = new Date().getFullYear();

      try {
        let curAges = await fetchTopicYear(pathogenId, metricId, geoId, nowYear);
        let curLen = curAges?.all?.length || 0;
        if (curLen === 0) {
          curAges = await fetchTopicYear(pathogenId, metricId, geoId, nowYear - 1);
          curLen = curAges?.all?.length || 0;
        }
        if (range !== "ytd" && (range === "52w" || curLen < targetN)) {
          try {
            const prevAges = await fetchTopicYear(pathogenId, metricId, geoId, nowYear - 1);
            curAges = mergeAgeMaps(prevAges, curAges);
          } catch (_) {}
        }
        if (curAges && Object.keys(curAges).length) {
          return { live: true, ages: sliceByRange(curAges, range), partialRange: false };
        }
      } catch (_) {
        // Fall through cleanly to verified 2026 UKHSA snapshot
      }

      const snapKey = `${pathogenId}|${metricId}|${geoId}`;
      const snap = UKHSA_SNAPSHOT[snapKey];
      if (snap) {
        return {
          live: false,
          ages: sliceByRange(snap, range === "ytd" ? "12w" : range),
          partialRange: range !== "12w",
        };
      }
      return { live: false, ages: null, partialRange: false };
    }

    /* ---------- Control Sync & Cohort Chips ---------- */
    function syncFilterControls() {
      const c = COPY[getLang()];

      if (!isMetricSupported(state.pathogen, state.metric, state.geo, state.compareMode)) {
        state.metric = "positivity";
      }

      elCompareBtn.setAttribute("aria-pressed", state.compareMode ? "true" : "false");
      elCompareBtn.classList.toggle("active", state.compareMode);
      elCompareBtn.textContent = state.compareMode ? c.compareActive : c.compareBtn;

      elPathogenTabs.forEach((btn) => {
        const pid = btn.dataset.pathogen;
        const on = !state.compareMode && pid === state.pathogen;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.tabIndex = (state.compareMode ? pid === state.pathogen : on) ? 0 : -1;
        btn.disabled = false;
      });

      const opts = [...elMetricSel.options];
      opts.forEach((opt) => {
        const val = opt.value;
        if (val === "positivity") opt.textContent = c.metricNames.positivity;
        else if (val === "admissions") {
          opt.textContent = !state.compareMode && state.pathogen === "covid"
            ? c.metricNames.admissionsCount
            : c.metricNames.admissionsRate;
        } else if (val === "icu") {
          opt.textContent = c.metricNames.icu;
        }
        opt.disabled = !isMetricSupported(state.pathogen, val, state.geo, state.compareMode);
      });
      elMetricSel.value = state.metric;

      [...elGeoSel.options].forEach((opt) => {
        opt.textContent = getRegionName(opt.value, false);
      });
      elGeoSel.value = state.geo;

      elRangeBtns.forEach((btn) => {
        const on = btn.dataset.range === state.range;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });

      elTypeBtns.forEach((btn) => {
        const on = btn.dataset.type === state.chartType;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });

      const isBar = state.chartType === "bar";
      const isStep = state.chartType === "step";
      elOptSmooth.disabled = isBar || isStep;
      elOptMarkers.disabled = isBar && !state.rollingAvg;
      elOptAutoScale.disabled = isBar;

      const setOptBtn = (btn, val) => {
        btn.classList.toggle("active", val && !btn.disabled);
        btn.setAttribute("aria-pressed", val ? "true" : "false");
      };
      setOptBtn(elOptSmooth, state.smooth);
      setOptBtn(elOptMarkers, state.markers);
      setOptBtn(elOptAvg, state.rollingAvg);
      setOptBtn(elOptMean, state.meanLine);
      setOptBtn(elOptAutoScale, state.autoScale);

      renderCohortChips();
    }

    function getActiveAgeList() {
      if (state.geo !== "England") return ["all"];
      const mDef = PATHOGENS[state.pathogen]?.metrics[state.metric];
      return AGE_GROUPS[mDef?.ageBand || "pos"];
    }

    function normalizeSelectedAges() {
      const allowed = getActiveAgeList();
      const filtered = state.selectedAges.filter((a) => allowed.includes(a));
      if (filtered.length) state.selectedAges = filtered;
      else if (allowed.includes("00-04") && allowed.includes("all")) state.selectedAges = ["00-04", "all"];
      else state.selectedAges = [allowed[0]];
    }

    function mkChip(label, color, active, onClick) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = active ? "surv-chip active" : "surv-chip";
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      if (color) btn.style.setProperty("--chip-color", color);
      const dot = document.createElement("i");
      dot.className = "surv-chip-dot";
      dot.setAttribute("aria-hidden", "true");
      btn.append(dot, document.createTextNode(label));
      btn.addEventListener("click", onClick);
      return btn;
    }

    function renderCohortChips() {
      const c = COPY[getLang()];
      elCohortChips.replaceChildren();

      if (state.compareMode) {
        elCohortLbl.textContent = c.pathogensLbl;
        const eligible = getCompareEligiblePathogens();
        state.comparePathogens = state.comparePathogens.filter((p) => eligible.includes(p));
        if (!state.comparePathogens.length) state.comparePathogens = eligible.slice(0, 2);

        eligible.forEach((pid) => {
          const on = state.comparePathogens.includes(pid);
          elCohortChips.appendChild(
            mkChip(getPathogenName(pid), PATHOGENS[pid].color, on, () => {
              if (on && state.comparePathogens.length === 1) return;
              state.comparePathogens = on
                ? state.comparePathogens.filter((x) => x !== pid)
                : eligible.filter((x) => x === pid || state.comparePathogens.includes(x));
              state.highlightedKey = null;
              updateAndRender();
            })
          );
        });

        if (state.geo === "England" && state.metric === "positivity") {
          const sep = document.createElement("span");
          sep.className = "surv-chip-sep";
          sep.setAttribute("aria-hidden", "true");
          elCohortChips.appendChild(sep);
          elCohortChips.appendChild(
            mkChip(c.u5Chip, "#0b5f6b", state.compareAge === "00-04", () => {
              state.compareAge = state.compareAge === "00-04" ? "all" : "00-04";
              updateAndRender();
            })
          );
        } else {
          state.compareAge = "all";
        }
        return;
      }

      if (state.geo !== "England") {
        elCohortLbl.textContent = c.regionAgeLbl;
        elCohortChips.appendChild(
          mkChip(`${getRegionName(state.geo, true)} · ${c.allAges}`, PATHOGENS[state.pathogen].color, true, () => {})
        );
        elCohortChips.appendChild(
          mkChip(c.engBaseline, "#475569", state.showEnglandBaseline, () => {
            state.showEnglandBaseline = !state.showEnglandBaseline;
            state.highlightedKey = null;
            updateAndRender();
          })
        );
        return;
      }

      elCohortLbl.textContent = c.ageLbl;
      normalizeSelectedAges();
      const allowed = getActiveAgeList();
      allowed.forEach((age) => {
        const on = state.selectedAges.includes(age);
        elCohortChips.appendChild(
          mkChip(formatAgeLabel(age), AGE_COLORS[age] || "#0b5f6b", on, () => {
            if (on && state.selectedAges.length === 1) return;
            state.selectedAges = on
              ? state.selectedAges.filter((a) => a !== age)
              : allowed.filter((a) => a === age || state.selectedAges.includes(a));
            state.highlightedKey = null;
            updateAndRender();
          })
        );
      });
    }

    /* ---------- Series Assembly ---------- */
    function buildUnifiedAxis(seriesRawList) {
      const dateSet = new Set();
      seriesRawList.forEach((s) => s.points.forEach(([d]) => dateSet.add(d)));
      const dates = [...dateSet].sort((a, b) => a.localeCompare(b));
      const series = seriesRawList.map((s) => {
        const map = new Map(s.points);
        const values = dates.map((d) => (map.has(d) ? map.get(d) : null));
        return { ...s, values };
      });
      return { dates, series };
    }

    function getLastTwoValid(values) {
      let lastIdx = -1, prevIdx = -1;
      for (let i = values.length - 1; i >= 0; i--) {
        if (Number.isFinite(values[i])) {
          if (lastIdx === -1) lastIdx = i;
          else { prevIdx = i; break; }
        }
      }
      return { lastIdx, prevIdx };
    }

    /* ---------- KPIs, Callout, Legend ---------- */
    function renderKpis(dates, series, unit, extra = {}) {
      const c = COPY[getLang()];
      elKpis.replaceChildren();
      if (!dates.length || !series.length) return;

      const primary = getFocusSeries(series);
      const { lastIdx, prevIdx } = getLastTwoValid(primary.values);
      const latestVal = lastIdx >= 0 ? primary.values[lastIdx] : null;
      const prevVal = prevIdx >= 0 ? primary.values[prevIdx] : null;
      const delta = Number.isFinite(latestVal) && Number.isFinite(prevVal) ? latestVal - prevVal : null;

      let peakVal = -Infinity, peakIdx = -1;
      let minVal = Infinity, sum = 0, count = 0;
      primary.values.forEach((v, i) => {
        if (!Number.isFinite(v)) return;
        if (v > peakVal) { peakVal = v; peakIdx = i; }
        if (v < minVal) minVal = v;
        sum += v;
        count++;
      });
      const meanVal = count ? sum / count : null;

      const mkKpi = (title, mainVal, subText, badgeText = null, badgeCls = "") => {
        const card = document.createElement("div");
        card.className = "surv-kpi";
        const lbl = document.createElement("span");
        lbl.className = "surv-kpi-lbl";
        lbl.textContent = title;
        const valRow = document.createElement("div");
        valRow.className = "surv-kpi-val-row";
        const val = document.createElement("strong");
        val.className = "surv-kpi-val";
        val.textContent = mainVal;
        valRow.appendChild(val);
        if (badgeText) {
          const b = document.createElement("span");
          b.className = `surv-delta ${badgeCls}`;
          b.textContent = badgeText;
          valRow.appendChild(b);
        }
        const sub = document.createElement("span");
        sub.className = "surv-kpi-sub";
        sub.textContent = subText;
        card.append(lbl, valRow, sub);
        return card;
      };

      const dCls = !Number.isFinite(delta) || Math.abs(delta) < 0.05 ? "flat" : delta > 0 ? "up" : "down";
      const dStr = Number.isFinite(delta) ? formatDelta(delta, unit) : null;
      elKpis.append(
        mkKpi(c.kpiLatest, formatValue(latestVal, unit), `${primary.label} · ${lastIdx >= 0 ? formatAxisDate(dates[lastIdx], true) : "—"}`, dStr, dCls),
        mkKpi(c.kpiPeak, peakIdx >= 0 ? formatValue(peakVal, unit) : "—", peakIdx >= 0 ? formatAxisDate(dates[peakIdx], true) : "—"),
        mkKpi(c.kpiMean, formatValue(meanVal, unit), c.weeks(count))
      );

      // Card 4: contextual comparison
      if (state.compareMode) {
        let best = null, bestVal = -Infinity;
        series.forEach((s) => {
          const { lastIdx: li } = getLastTwoValid(s.values);
          if (li >= 0 && s.values[li] > bestVal) { bestVal = s.values[li]; best = s; }
        });
        elKpis.appendChild(mkKpi(c.kpiLead, best ? formatValue(bestVal, unit) : "—", best ? best.label : "—"));
        elCallout.textContent = best
          ? c.calloutCompare(best.label, formatValue(bestVal, unit), getRegionName(state.geo, true))
          : "";
      } else if (state.geo !== "England" && extra.engAll) {
        const { lastIdx: eli } = getLastTwoValid(extra.engAll.values);
        const engLatest = eli >= 0 ? extra.engAll.values[eli] : null;
        const diff = Number.isFinite(latestVal) && Number.isFinite(engLatest) ? latestVal - engLatest : null;
        const diffStr = Number.isFinite(diff) ? formatDelta(diff, unit) : "—";
        elKpis.appendChild(mkKpi(c.kpiBaseline, diffStr, `${getRegionName("England", true)}: ${formatValue(engLatest, unit)}`));
        if (Number.isFinite(diff) && Number.isFinite(engLatest)) {
          const absFmt = formatValue(Math.abs(diff), unit);
          const phrase = Math.abs(diff) < 0.05 ? c.same : diff > 0 ? c.above(absFmt) : c.below(absFmt);
          elCallout.textContent = c.calloutRegion(getPathogenName(state.pathogen), getRegionName(state.geo, true), formatValue(latestVal, unit), formatValue(engLatest, unit), phrase);
        } else {
          elCallout.textContent = "";
        }
      } else if (extra.u5 && extra.all) {
        const { lastIdx: uli } = getLastTwoValid(extra.u5.values);
        const { lastIdx: ali } = getLastTwoValid(extra.all.values);
        const uVal = uli >= 0 ? extra.u5.values[uli] : null;
        const aVal = ali >= 0 ? extra.all.values[ali] : null;
        if (Number.isFinite(uVal) && Number.isFinite(aVal) && aVal > 0.05) {
          const ratio = formatNumber(uVal / aVal, 1);
          elKpis.appendChild(mkKpi(c.kpiRatio, `${ratio}×`, `${formatValue(uVal, unit)} vs ${formatValue(aVal, unit)}`));
          elCallout.textContent = uVal / aVal >= 1.3
            ? c.calloutRatio(getPathogenName(state.pathogen), getRegionName(state.geo, true), formatValue(uVal, unit), formatValue(aVal, unit), ratio)
            : c.calloutTrend(getPathogenName(state.pathogen), getRegionName(state.geo, true), formatValue(latestVal, unit), dStr || "—");
        } else {
          const rangeStr = Number.isFinite(minVal) && Number.isFinite(peakVal) ? `${formatValue(minVal, unit)} – ${formatValue(peakVal, unit)}` : "—";
          elKpis.appendChild(mkKpi(c.kpiSpread, rangeStr, primary.label));
          elCallout.textContent = c.calloutTrend(getPathogenName(state.pathogen), getRegionName(state.geo, true), formatValue(latestVal, unit), dStr || "—");
        }
      } else {
        const rangeStr = Number.isFinite(minVal) && Number.isFinite(peakVal) ? `${formatValue(minVal, unit)} – ${formatValue(peakVal, unit)}` : "—";
        elKpis.appendChild(mkKpi(c.kpiSpread, rangeStr, primary.label));
        elCallout.textContent = c.calloutTrend(getPathogenName(state.pathogen), getRegionName(state.geo, true), formatValue(latestVal, unit), dStr || "—");
      }
    }

    function getFocusSeries(series) {
      return series.find((s) => s.key === state.highlightedKey) || series[0];
    }

    function renderLegend(series, rollingValues) {
      const c = COPY[getLang()];
      elLegend.replaceChildren();
      series.forEach((s) => {
        const btn = document.createElement("button");
        btn.type = "button";
        const isDimmed = state.highlightedKey && state.highlightedKey !== s.key;
        btn.className = `surv-leg-btn${isDimmed ? " dimmed" : ""}${state.highlightedKey === s.key ? " active" : ""}`;
        const sw = document.createElement("i");
        sw.className = s.dashed ? "surv-leg-sw dashed" : "surv-leg-sw";
        sw.style.setProperty("--sw", s.color);
        sw.setAttribute("aria-hidden", "true");
        btn.append(sw, document.createTextNode(s.label));
        btn.addEventListener("click", () => {
          state.highlightedKey = state.highlightedKey === s.key ? null : s.key;
          if (lastRendered) {
            const focus = getFocusSeries(lastRendered.series);
            lastRendered.rollingValues = focus ? computeRollingMean(focus.values, 4) : null;
            renderKpis(lastRendered.dates, lastRendered.series, lastRendered.unit, lastRendered.extra);
            renderLegend(lastRendered.series, lastRendered.rollingValues);
            drawSvgChart(lastRendered);
          }
        });
        elLegend.appendChild(btn);
      });

      if (rollingValues && state.rollingAvg) {
        const sp = document.createElement("span");
        sp.className = "surv-leg-static";
        const sw = document.createElement("i");
        sw.className = "surv-leg-sw dashed";
        sw.style.setProperty("--sw", "#334155");
        sw.setAttribute("aria-hidden", "true");
        sp.append(sw, document.createTextNode(c.rollingAvgLeg));
        elLegend.appendChild(sp);
      }
    }

    /* ---------- SVG Chart Renderer ---------- */
    function svgEl(tag, attrs = {}) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
      return el;
    }

    function splitContiguous(values, xCoords, yFn) {
      const segs = [];
      let cur = [];
      values.forEach((v, idx) => {
        if (Number.isFinite(v)) cur.push([xCoords[idx], yFn(v), idx, v]);
        else if (cur.length) { segs.push(cur); cur = []; }
      });
      if (cur.length) segs.push(cur);
      return segs;
    }

    function buildStraightPath(pts) {
      return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    }

    function buildStepPath(pts) {
      if (!pts.length) return "";
      let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        d += ` H${pts[i][0].toFixed(1)} V${pts[i][1].toFixed(1)}`;
      }
      return d;
    }

    function drawSvgChart(payload) {
      const { dates, series, unit, rollingValues } = payload;
      elChart.replaceChildren();

      const rect = elStage.getBoundingClientRect();
      const W = Math.max(300, Math.round(rect.width || 880));
      const H = W < 520 ? 255 : 330;
      elChart.setAttribute("viewBox", `0 0 ${W} ${H}`);

      if (!dates.length || !series.length) {
        if (elEmpty) {
          elEmpty.textContent = COPY[getLang()].noData;
          elEmpty.hidden = false;
        }
        if (elTooltip) elTooltip.hidden = true;
        chartGeoMeta = { padL: 48, padR: 18, padT: 16, padB: 30, plotW: W - 66, plotH: H - 46, width: W, height: H, pointsX: [] };
        return;
      }
      if (elEmpty) elEmpty.hidden = true;

      const padL = unit === "/day" ? 54 : unit === "/100k" ? 50 : 44;
      const padR = 16;
      const padT = 18;
      const padB = 30;
      const plotW = Math.max(80, W - padL - padR);
      const plotH = Math.max(80, H - padT - padB);

      const allNums = [];
      series.forEach((s) => s.values.forEach((v) => { if (Number.isFinite(v)) allNums.push(v); }));
      if (state.rollingAvg && rollingValues) rollingValues.forEach((v) => { if (Number.isFinite(v)) allNums.push(v); });
      const rawMin = allNums.length ? Math.min(...allNums) : 0;
      const rawMax = allNums.length ? Math.max(...allNums) : 5;
      const allowAuto = state.autoScale && state.chartType !== "bar";
      const { yMin, yMax, ticks } = niceScale(rawMin, rawMax, allowAuto);

      const len = dates.length;
      const isBar = state.chartType === "bar";
      const xCoords = dates.map((_, idx) => {
        if (isBar) return padL + ((idx + 0.5) / len) * plotW;
        return padL + (len > 1 ? (idx / (len - 1)) * plotW : plotW * 0.5);
      });
      const yFn = (val) => padT + plotH - ((val - yMin) / Math.max(1e-6, yMax - yMin)) * plotH;
      chartGeoMeta = { padL, padR, padT, padB, plotW, plotH, width: W, height: H, pointsX: xCoords, yFn };

      const defs = svgEl("defs");
      series.forEach((s, idx) => {
        const grad = svgEl("linearGradient", { id: `survGrad${idx}`, x1: 0, y1: 0, x2: 0, y2: 1 });
        grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": s.color, "stop-opacity": idx === 0 ? "0.24" : "0.1" }));
        grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": s.color, "stop-opacity": "0.01" }));
        defs.appendChild(grad);
      });
      elChart.appendChild(defs);

      // Horizontal gridlines & Y ticks
      ticks.forEach((tv, i) => {
        const y = yFn(tv);
        elChart.appendChild(svgEl("line", {
          x1: padL, y1: y.toFixed(1), x2: W - padR, y2: y.toFixed(1),
          stroke: i === 0 ? "rgba(11,95,107,0.22)" : "rgba(11,95,107,0.09)",
          "stroke-dasharray": i === 0 ? "" : "3 3",
        }));
        const dec = tv % 1 === 0 ? 0 : 1;
        const lbl = unit === "%" ? `${formatNumber(tv, dec)}%` : formatNumber(tv, dec);
        const txt = svgEl("text", { x: padL - 7, y: (y + 3.5).toFixed(1), "text-anchor": "end", "font-size": "11", fill: "#485966" });
        txt.textContent = lbl;
        elChart.appendChild(txt);
      });

      // X-axis date ticks (avoid overcrowding on small screens)
      const crossYear = dates[0].slice(0, 4) !== dates[len - 1].slice(0, 4);
      const maxXTicks = W < 460 ? 4 : W < 700 ? 6 : 8;
      const stepIdx = Math.max(1, Math.ceil((len - 1) / Math.max(2, maxXTicks - 1)));
      const xTickSet = new Set([0, len - 1]);
      for (let i = stepIdx; i < len - 1; i += stepIdx) {
        if (len - 1 - i >= Math.ceil(stepIdx * 0.55)) xTickSet.add(i);
      }
      [...xTickSet].sort((a, b) => a - b).forEach((idx) => {
        const anchor = idx === 0 ? "start" : idx === len - 1 ? "end" : "middle";
        const x = idx === 0 && isBar ? padL : idx === len - 1 && isBar ? W - padR : xCoords[idx];
        const t = svgEl("text", { x: x.toFixed(1), y: H - 8, "text-anchor": anchor, "font-size": "11", fill: "#485966" });
        t.textContent = formatAxisDate(dates[idx], crossYear);
        elChart.appendChild(t);
      });

      const hoverLayer = svgEl("g", { id: "survHoverLayer" });

      if (isBar) {
        const slotW = plotW / len;
        const groupW = Math.min(slotW * 0.78, Math.max(12, series.length * 14));
        const barW = Math.max(2.5, (groupW - (series.length - 1) * 1.8) / series.length);
        const baseY = padT + plotH;

        series.forEach((s, sIdx) => {
          const dimmed = state.highlightedKey && state.highlightedKey !== s.key;
          const g = svgEl("g", { opacity: dimmed ? "0.2" : "0.92" });
          s.values.forEach((v, dIdx) => {
            if (!Number.isFinite(v)) return;
            const y = yFn(v);
            const h = Math.max(1.5, baseY - y);
            const x = xCoords[dIdx] - groupW / 2 + sIdx * (barW + 1.8);
            const r = Math.min(3, barW / 2, h);
            const d = `M${x.toFixed(1)},${baseY.toFixed(1)} V${(y + r).toFixed(1)} Q${x.toFixed(1)},${y.toFixed(1)} ${(x + r).toFixed(1)},${y.toFixed(1)} H${(x + barW - r).toFixed(1)} Q${(x + barW).toFixed(1)},${y.toFixed(1)} ${(x + barW).toFixed(1)},${(y + r).toFixed(1)} V${baseY.toFixed(1)} Z`;
            g.appendChild(svgEl("path", { d, fill: s.color }));
          });
          elChart.appendChild(g);
        });
      } else {
        const drawOrder = [...series.map((s, idx) => ({ s, idx }))].reverse();
        const isStep = state.chartType === "step";
        const isArea = state.chartType === "area";
        const useSmooth = state.smooth && !isStep;
        const baseY = padT + plotH;

        drawOrder.forEach(({ s, idx }) => {
          const dimmed = state.highlightedKey && state.highlightedKey !== s.key;
          const opacity = dimmed ? "0.2" : "1";
          const segs = splitContiguous(s.values, xCoords, yFn);
          const g = svgEl("g", { opacity });

          segs.forEach((seg) => {
            if (seg.length >= 2) {
              const lineD = isStep
                ? buildStepPath(seg)
                : useSmooth
                  ? buildMonotonePath(seg, padT, baseY)
                  : buildStraightPath(seg);

              if (isArea && !s.dashed) {
                const firstX = seg[0][0].toFixed(1);
                const lastX = seg[seg.length - 1][0].toFixed(1);
                g.appendChild(svgEl("path", { d: `${lineD} L${lastX},${baseY.toFixed(1)} L${firstX},${baseY.toFixed(1)} Z`, fill: `url(#survGrad${idx})` }));
              }
              g.appendChild(svgEl("path", {
                d: lineD,
                fill: "none",
                stroke: s.color,
                "stroke-width": idx === 0 ? 2.6 : 2,
                "stroke-dasharray": s.dashed ? "5 4" : "",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
              }));
            }
            if (state.markers || seg.length === 1) {
              const r = len > 28 ? 2.2 : 3.2;
              seg.forEach(([px, py]) => {
                g.appendChild(svgEl("circle", { cx: px.toFixed(1), cy: py.toFixed(1), r, fill: s.color, stroke: "#fff", "stroke-width": 1.2 }));
              });
            }
          });
          elChart.appendChild(g);
        });
      }

      // 4-week rolling average overlay for primary series
      if (state.rollingAvg && rollingValues) {
        const segs = splitContiguous(rollingValues, xCoords, yFn);
        segs.forEach((seg) => {
          if (seg.length < 2) return;
          const d = state.smooth && state.chartType !== "step"
            ? buildMonotonePath(seg, padT, padT + plotH)
            : buildStraightPath(seg);
          elChart.appendChild(svgEl("path", {
            d, fill: "none", stroke: "#334155", "stroke-width": 2, "stroke-dasharray": "5 3", "stroke-linecap": "round",
          }));
        });
      }

      // Period mean horizontal reference line
      if (state.meanLine) {
        const focus = getFocusSeries(series);
        const vals = focus ? focus.values.filter(Number.isFinite) : [];
        if (vals.length) {
          const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
          const my = yFn(mean);
          elChart.appendChild(svgEl("line", {
            x1: padL, y1: my.toFixed(1), x2: W - padR, y2: my.toFixed(1),
            stroke: "#0f172a", "stroke-width": 1.3, "stroke-dasharray": "6 4", opacity: "0.7",
          }));
          const tagText = COPY[getLang()].meanRef(formatValue(mean, unit));
          const tw = Math.max(66, tagText.length * 6.4 + 14);
          const pillY = Math.max(padT + 2, my - 19);
          elChart.appendChild(svgEl("rect", {
            x: (W - padR - tw).toFixed(1), y: pillY.toFixed(1), width: tw.toFixed(1), height: 17, rx: 8.5,
            fill: "#12232e", opacity: "0.9",
          }));
          const mt = svgEl("text", {
            x: (W - padR - tw / 2).toFixed(1), y: (pillY + 12).toFixed(1),
            "text-anchor": "middle", "font-size": "10", "font-weight": "600", fill: "#fff",
          });
          mt.textContent = tagText;
          elChart.appendChild(mt);
        }
      }

      elChart.appendChild(hoverLayer);
      paintHoverOverlay();
    }

    function paintHoverOverlay() {
      const hoverLayer = document.getElementById("survHoverLayer");
      if (!hoverLayer || !lastRendered) return;
      hoverLayer.replaceChildren();

      const { dates, series, unit, rollingValues } = lastRendered;
      const idx = state.activeIdx;
      if (idx < 0 || idx >= dates.length) {
        elHoverReadout.textContent = "";
        elTooltip.hidden = true;
        return;
      }

      const { padT, plotH, plotW, width, pointsX, yFn } = chartGeoMeta;
      const x = pointsX[idx];
      if (!Number.isFinite(x)) return;

      if (state.chartType === "bar") {
        const slotW = plotW / dates.length;
        hoverLayer.appendChild(svgEl("rect", {
          x: (x - slotW * 0.45).toFixed(1), y: padT, width: (slotW * 0.9).toFixed(1), height: plotH, rx: 4,
          fill: "rgba(11,95,107,0.08)",
        }));
      } else {
        hoverLayer.appendChild(svgEl("line", {
          x1: x.toFixed(1), y1: padT, x2: x.toFixed(1), y2: (padT + plotH).toFixed(1),
          stroke: "rgba(11,95,107,0.45)", "stroke-width": 1.3, "stroke-dasharray": "3 3",
        }));
      }

      const firstValid = series.find((s) => Number.isFinite(s.values[idx]));
      elHoverReadout.textContent = firstValid
        ? `${formatAxisDate(dates[idx], true)} · ${firstValid.label}: ${formatValue(firstValid.values[idx], unit)}`
        : formatAxisDate(dates[idx], true);

      // Build crisp tooltip
      elTooltip.replaceChildren();
      const head = document.createElement("div");
      head.className = "surv-tt-date";
      head.textContent = formatAxisDate(dates[idx], true);
      elTooltip.appendChild(head);

      const list = document.createElement("div");
      list.className = "surv-tt-rows";
      series.forEach((s) => {
        const val = s.values[idx];
        const prev = idx > 0 && Number.isFinite(s.values[idx - 1]) ? s.values[idx - 1] : null;
        const row = document.createElement("div");
        row.className = "surv-tt-row";
        const sw = document.createElement("i");
        sw.className = "surv-tt-dot";
        sw.style.background = s.color;
        const lbl = document.createElement("span");
        lbl.className = "surv-tt-lbl";
        lbl.textContent = s.label;
        const vEl = document.createElement("strong");
        vEl.className = "surv-tt-val";
        vEl.textContent = formatValue(val, unit);
        row.append(sw, lbl, vEl);
        if (Number.isFinite(val) && Number.isFinite(prev)) {
          const dEl = document.createElement("span");
          dEl.className = "surv-tt-delta";
          dEl.textContent = formatDelta(val - prev, unit);
          row.appendChild(dEl);
        }
        list.appendChild(row);

        if (state.chartType !== "bar" && Number.isFinite(val)) {
          hoverLayer.appendChild(svgEl("circle", {
            cx: x.toFixed(1), cy: yFn(val).toFixed(1), r: 5, fill: s.color, stroke: "#fff", "stroke-width": 2,
          }));
        }
      });

      if (state.rollingAvg && rollingValues && Number.isFinite(rollingValues[idx])) {
        const row = document.createElement("div");
        row.className = "surv-tt-row";
        const sw = document.createElement("i");
        sw.className = "surv-tt-dot";
        sw.style.background = "#334155";
        const lbl = document.createElement("span");
        lbl.className = "surv-tt-lbl";
        lbl.textContent = COPY[getLang()].rollingAvgLeg;
        const vEl = document.createElement("strong");
        vEl.className = "surv-tt-val";
        vEl.textContent = formatValue(rollingValues[idx], unit);
        row.append(sw, lbl, vEl);
        list.appendChild(row);
      }

      elTooltip.appendChild(list);
      elTooltip.hidden = false;

      // Smart positioning inside chart stage without overflowing
      const stageRect = elStage.getBoundingClientRect();
      const px = (x / width) * stageRect.width;
      const ttW = elTooltip.offsetWidth || 190;
      const goLeft = px > stageRect.width * 0.56;
      const leftPx = goLeft ? Math.max(8, px - ttW - 14) : Math.min(stageRect.width - ttW - 8, px + 14);
      elTooltip.style.left = `${leftPx.toFixed(0)}px`;
      elTooltip.style.top = "10px";
    }

    /* ---------- Master Async Update & Render ---------- */
    async function updateAndRender(forceRefresh = false) {
      const seq = ++renderSeq;
      const c = COPY[getLang()];
      if (forceRefresh) {
        yearCache.clear();
        isRefreshing = true;
        elRefresh.classList.add("spinning");
      }

      syncFilterControls();
      elStatus.textContent = isRefreshing ? c.loading : elStatus.textContent;

      let rawSeries = [];
      let allLive = false;
      let anyPartial = false;
      let engBaselineSeries = null;

      if (state.compareMode) {
        const activePids = state.comparePathogens;
        const results = await Promise.all(
          activePids.map((pid) => loadSeriesData(pid, state.metric, state.geo, state.range))
        );
        if (seq !== renderSeq) return;

        allLive = results.length > 0 && results.every((r) => r.live);
        anyPartial = results.some((r) => r.partialRange);

        activePids.forEach((pid, idx) => {
          const res = results[idx];
          if (!res.ages) return;
          const usedFallbackAll = state.compareAge !== "all" && !res.ages[state.compareAge];
          const pts = res.ages[state.compareAge] || res.ages.all;
          if (pts?.length) {
            rawSeries.push({
              key: pid,
              label: usedFallbackAll ? `${getPathogenName(pid)} (${c.allAges})` : getPathogenName(pid),
              color: PATHOGENS[pid].color,
              dashed: usedFallbackAll,
              points: pts,
            });
          }
        });
      } else {
        const needEngBaseline = state.geo !== "England" && state.showEnglandBaseline;
        const [mainRes, engRes] = await Promise.all([
          loadSeriesData(state.pathogen, state.metric, state.geo, state.range),
          needEngBaseline ? loadSeriesData(state.pathogen, state.metric, "England", state.range) : Promise.resolve(null),
        ]);
        if (seq !== renderSeq) return;

        allLive = mainRes.live && (!engRes || engRes.live);
        anyPartial = mainRes.partialRange || Boolean(engRes?.partialRange);

        if (mainRes.ages) {
          if (state.geo === "England") {
            const agesToShow = state.selectedAges.filter((a) => mainRes.ages[a]?.length);
            const fallbackAge = mainRes.ages.all ? ["all"] : Object.keys(mainRes.ages).slice(0, 1);
            (agesToShow.length ? agesToShow : fallbackAge).forEach((age) => {
              rawSeries.push({
                key: age,
                label: formatAgeLabel(age),
                color: AGE_COLORS[age] || "#0b5f6b",
                dashed: false,
                points: mainRes.ages[age],
              });
            });
          } else if (mainRes.ages.all?.length) {
            rawSeries.push({
              key: `geo-${state.geo}`,
              label: `${getRegionName(state.geo, true)} (${c.allAges})`,
              color: PATHOGENS[state.pathogen].color,
              dashed: false,
              points: mainRes.ages.all,
            });
            if (engRes?.ages?.all?.length) {
              rawSeries.push({
                key: "eng-baseline",
                label: `${getRegionName("England", true)} (${c.allAges})`,
                color: "#475569",
                dashed: true,
                points: engRes.ages.all,
              });
            }
          }
        }
      }

      isRefreshing = false;
      elRefresh.classList.remove("spinning");

      const { dates, series } = buildUnifiedAxis(rawSeries);
      const unit = getMetricUnit(state.pathogen, state.metric);
      const focus = getFocusSeries(series);
      const rollingValues = focus ? computeRollingMean(focus.values, 4) : null;

      if (state.geo !== "England") {
        engBaselineSeries = series.find((s) => s.key === "eng-baseline") || null;
      }
      const u5Series = series.find((s) => s.key === "00-04") || null;
      const allSeries = series.find((s) => s.key === "all") || null;
      const extra = { engAll: engBaselineSeries, u5: u5Series, all: allSeries };

      lastRendered = { dates, series, unit, rollingValues, extra };
      if (state.activeIdx >= dates.length) state.activeIdx = -1;

      elStatus.textContent = allLive ? c.live : c.snapshot;
      elStatus.classList.toggle("live", allLive);

      // Filter contextual note
      const notes = [];
      if (state.compareMode) notes.push(state.metric === "admissions" ? c.compareNoteAdm : c.compareNotePos);
      else if (state.geo !== "England") notes.push(c.regionAgeNote(getRegionName(state.geo, true)));
      else if (state.pathogen === "covid") notes.push(c.covidAgeNote);
      if (!allLive && anyPartial) notes.push(c.snapshotNote);
      elFilterNote.textContent = notes.join(" ");

      elDate.textContent = dates.length ? `${c.datePrefix} ${dates[dates.length - 1]}` : `${c.datePrefix} —`;

      renderKpis(dates, series, unit, extra);
      renderLegend(series, rollingValues);
      drawSvgChart(lastRendered);
    }

    /* ---------- Export CSV ---------- */
    function exportCsv() {
      if (!lastRendered || !lastRendered.dates.length) return;
      const { dates, series, rollingValues } = lastRendered;
      const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const headers = ["date", ...series.map((s) => s.label)];
      if (state.rollingAvg && rollingValues) headers.push(COPY[getLang()].rollingAvgLeg);

      const lines = [headers.map(esc).join(",")];
      dates.forEach((d, idx) => {
        const row = [d, ...series.map((s) => (Number.isFinite(s.values[idx]) ? s.values[idx] : ""))];
        if (state.rollingAvg && rollingValues) {
          row.push(Number.isFinite(rollingValues[idx]) ? Number(rollingValues[idx].toFixed(2)) : "");
        }
        lines.push(row.map(esc).join(","));
      });

      const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const scope = state.compareMode ? "compare" : state.pathogen;
      const geoSlug = state.geo.toLowerCase().replace(/\s+/g, "-");
      a.href = url;
      a.download = `ukhsa-${scope}-${state.metric}-${geoSlug}-${state.range}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    /* ---------- Event Listeners ---------- */
    elPathogenTabs.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        state.compareMode = false;
        state.pathogen = btn.dataset.pathogen;
        state.highlightedKey = null;
        state.activeIdx = -1;
        updateAndRender();
      });
      btn.addEventListener("keydown", (e) => {
        let next = -1;
        if (e.key === "ArrowRight") next = (idx + 1) % elPathogenTabs.length;
        else if (e.key === "ArrowLeft") next = (idx - 1 + elPathogenTabs.length) % elPathogenTabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = elPathogenTabs.length - 1;
        if (next >= 0) {
          e.preventDefault();
          elPathogenTabs[next].focus();
          elPathogenTabs[next].click();
        }
      });
    });

    elCompareBtn.addEventListener("click", () => {
      state.compareMode = !state.compareMode;
      state.highlightedKey = null;
      state.activeIdx = -1;
      updateAndRender();
    });

    elMetricSel.addEventListener("change", () => {
      state.metric = elMetricSel.value;
      state.highlightedKey = null;
      state.activeIdx = -1;
      updateAndRender();
    });

    elGeoSel.addEventListener("change", () => {
      state.geo = elGeoSel.value;
      state.highlightedKey = null;
      state.activeIdx = -1;
      updateAndRender();
    });

    elRangeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.range = btn.dataset.range;
        state.activeIdx = -1;
        updateAndRender();
      });
    });

    elTypeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.chartType = btn.dataset.type;
        syncFilterControls();
        if (lastRendered) {
          renderLegend(lastRendered.series, lastRendered.rollingValues);
          drawSvgChart(lastRendered);
        }
      });
    });

    const toggleOpt = (prop) => {
      state[prop] = !state[prop];
      syncFilterControls();
      if (lastRendered) {
        renderLegend(lastRendered.series, lastRendered.rollingValues);
        drawSvgChart(lastRendered);
      }
    };
    elOptSmooth.addEventListener("click", () => !elOptSmooth.disabled && toggleOpt("smooth"));
    elOptMarkers.addEventListener("click", () => !elOptMarkers.disabled && toggleOpt("markers"));
    elOptAvg.addEventListener("click", () => toggleOpt("rollingAvg"));
    elOptMean.addEventListener("click", () => toggleOpt("meanLine"));
    elOptAutoScale.addEventListener("click", () => !elOptAutoScale.disabled && toggleOpt("autoScale"));

    const inspectPointer = (clientX) => {
      if (!lastRendered || !lastRendered.dates.length) return;
      const rect = elChart.getBoundingClientRect();
      const relX = ((clientX - rect.left) / Math.max(1, rect.width)) * chartGeoMeta.width;
      let bestIdx = 0, bestDist = Infinity;
      chartGeoMeta.pointsX.forEach((px, i) => {
        const d = Math.abs(px - relX);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      if (bestIdx !== state.activeIdx) {
        state.activeIdx = bestIdx;
        paintHoverOverlay();
      }
    };

    elChart.addEventListener("pointermove", (e) => inspectPointer(e.clientX));
    elChart.addEventListener("pointerdown", (e) => inspectPointer(e.clientX));
    elChart.addEventListener("pointerleave", () => {
      state.activeIdx = -1;
      paintHoverOverlay();
    });
    elChart.addEventListener("keydown", (e) => {
      if (!lastRendered || !lastRendered.dates.length) return;
      const len = lastRendered.dates.length;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        state.activeIdx = state.activeIdx < 0 ? len - 1 : (state.activeIdx + 1) % len;
        paintHoverOverlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        state.activeIdx = state.activeIdx < 0 ? len - 1 : (state.activeIdx - 1 + len) % len;
        paintHoverOverlay();
      } else if (e.key === "Home") {
        e.preventDefault();
        state.activeIdx = 0;
        paintHoverOverlay();
      } else if (e.key === "End") {
        e.preventDefault();
        state.activeIdx = len - 1;
        paintHoverOverlay();
      } else if (e.key === "Escape") {
        state.activeIdx = -1;
        paintHoverOverlay();
      }
    });

    elRefresh.addEventListener("click", () => updateAndRender(true));
    elExportCsv.addEventListener("click", exportCsv);

    window.addEventListener("langchange", () => {
      updateAndRender(false);
    });

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        if (lastRendered) drawSvgChart(lastRendered);
      });
      ro.observe(elStage);
    } else {
      window.addEventListener("resize", () => {
        if (lastRendered) drawSvgChart(lastRendered);
      });
    }

    // Immediate verified snapshot paint, followed by live sync & gentle 5-min refresh when visible
    let isVisible = false;
    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 }).observe(sec);
    }

    // Synchronous snapshot bootstrap for zero blank flash, then live API sync
    const snapBoot = UKHSA_SNAPSHOT["rsv|positivity|England"];
    if (snapBoot) {
      const bootSeries = ["00-04", "all"].map((age) => ({
        key: age,
        label: formatAgeLabel(age),
        color: AGE_COLORS[age],
        dashed: false,
        points: snapBoot[age],
      }));
      const bootAxis = buildUnifiedAxis(bootSeries);
      lastRendered = {
        ...bootAxis,
        unit: "%",
        rollingValues: computeRollingMean(bootAxis.series[0].values, 4),
        extra: { u5: bootAxis.series[0], all: bootAxis.series[1] },
      };
      syncFilterControls();
      elStatus.textContent = COPY[getLang()].snapshot;
      renderKpis(lastRendered.dates, lastRendered.series, "%", lastRendered.extra);
      renderLegend(lastRendered.series, lastRendered.rollingValues);
      drawSvgChart(lastRendered);
      elDate.textContent = `${COPY[getLang()].datePrefix} ${lastRendered.dates[lastRendered.dates.length - 1]}`;
    }

    updateAndRender(false);
    const pollId = setInterval(() => {
      if (!document.hidden && isVisible) updateAndRender(true);
    }, 300000);
    window.addEventListener("pagehide", () => clearInterval(pollId));
  })();
}
