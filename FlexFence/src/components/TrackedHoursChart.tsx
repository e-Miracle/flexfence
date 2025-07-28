import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Svg, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const TrackedHoursChart = () => {
    const data = [6.5, 5.2, 3.3, 4.55, 6.0, 2.2, 3.0];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const chartHeight = 200;

    const Labels = ({ x, y, bandwidth, data }: any) =>
        data.map((value: number, index: number) => {
            if (index === 3) {
                return (
                    <SvgText
                        key={index}
                        x={x(index) + bandwidth / 2}
                        y={y(value) - 10}
                        fontSize={12}
                        fill="#00C1FF"
                        alignmentBaseline="middle"
                        textAnchor="middle"
                    >
                        4h 33m
                    </SvgText>
                );
            }
            return null;
        });

    return (
        <View style={styles.container}>
            <View style={{padding:10}}>
                <Text style={styles.title}>Tracked hours</Text>

            </View>
            <View style={{ backgroundColor: '#fff', padding: 20, borderBottomLeftRadius:20, borderBottomRightRadius:20 }}>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>Progress</Text>
                    <Text style={styles.totalHours}>20.4h hours this week</Text>
                </View>

                <View style={{ flexDirection: 'row', height: chartHeight }}>
                    {/* Y-Axis */}
                    <YAxis
                        data={[0, 1.3, 2.6, 3.9, 5.2, 6.5, 7.8]}
                        contentInset={{ top: 20, bottom: 10 }}
                        svg={{ fontSize: 10, fill: 'gray' }}
                        numberOfTicks={7}
                        scale={scale.scaleLinear}
                    />

                    {/* Bar Chart */}
                    <BarChart
                        style={{ flex: 1, marginLeft: 10 }}
                        data={data}
                        svg={{
                            fill: 'black',
                            rx: 10,
                            ry: 10,
                        }}
                        spacingInner={0.4}
                        contentInset={{ top: 20, bottom: 10 }}
                        yMin={0}
                        yMax={7.8}
                        numberOfTicks={7}
                    >
                        <Labels />
                    </BarChart>
                </View>

                {/* Day Labels */}
                <View style={styles.daysRow}>
                    {days.map((day, index) => (
                        <Text key={index} style={styles.dayLabel}>
                            {day}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F8FF',
        borderRadius: 16,
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6, // ✅ For Android
    },
    
    title: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalHours: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 'auto',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    dayLabel: {
        fontWeight: '600',
    },
});

export default TrackedHoursChart;