import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import * as GlobalVariableContext from '../config/GlobalVariableContext';

const graphicColor = ['#000F6D', '#B2BBF4', '#001FDB'];

const defaultGraphicData = [
  { x: 'To Do', y: 100 },
  { x: 'In Progress', y: 0 },
  { x: 'Completed', y: 0 },
];

export function Home() {
  const [data, setGraphicData] = useState(defaultGraphicData);
  const variables = GlobalVariableContext.useValues();

  const total = Array.isArray(data)
    ? data.reduce((acc, datum) => acc + datum.y, 0)
    : 0;
  const fontSize = Dimensions.get('window').width * 0.6 * 0.04;

  useEffect(() => {
    setGraphicData(variables.statusPercentage);
  }, [variables.statusPercentage]);

  return (
    <View style={{ justifyContent: 'center' }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={data}
        innerRadius={8}
        width={Dimensions.get('window').width * 0.6}
        height={Dimensions.get('window').width * 0.6}
        labelRadius={Dimensions.get('window').width * 0.2}
        labels={({ datum }) =>
          `${datum.x}\n${Math.round((datum.y / total) * 100)}%`
        }
        style={{
          data: {
            fill: ({ datum }) => {
              switch (datum.x) {
                case 'To Do':
                  return graphicColor[0];
                case 'In Progress':
                  return graphicColor[1];
                case 'Completed':
                  return graphicColor[2];
                default:
                  return '#000000'; // Default color if no match
              }
            },
            fillOpacity: 0.9,
            stroke: '#fff',
            strokeWidth: 2,
          },
          labels: {
            fontSize: fontSize,
            fill: '#212121',
          },
        }}
      />
    </View>
  );
}
