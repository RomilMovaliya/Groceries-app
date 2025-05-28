import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LocationLogo from '../../assets/location.svg';
import CustomDropdown from '../../components/CustomDropdown';
import Button from '../../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationData } from '../../store/LocationData';
import { Area, Zone } from '../../types/types';



const SelectLocation = () => {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const zoneData: Zone[] = LocationData.map((item) => ({
        id: item.id,
        name: item.zone,
    }));

    const areaData: Area[] = selectedZone
        ? LocationData.find((item) => item.zone === selectedZone.name)?.area.map((name, index) => ({
            id: index,
            name,
        })) ?? []
        : [];

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <LocationLogo height={200} width={200} />

                <View style={styles.title}>
                    <Text style={styles.titleText}>Select Your Location</Text>
                    <Text style={styles.subtitleText}>
                        Switch on your location to stay in tune with what’s happening in your area
                    </Text>

                    <View style={styles.box}>
                        <View>
                            <Text>Your Zone</Text>
                            <CustomDropdown
                                data={zoneData}
                                onSelect={(zone: Zone) => {
                                    setSelectedZone(zone);
                                    setSelectedArea(null);
                                }}
                            />
                        </View>

                        <View>
                            <Text>Your Area</Text>
                            <CustomDropdown
                                data={areaData}
                                onSelect={(area: Area) => {
                                    setSelectedArea(area);
                                }}
                            />
                        </View>

                        <Button title={'Submit'} path={'/screens/HomeScreen'} />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default SelectLocation;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 60,
    },
    title: {
        marginHorizontal: 20,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
    subtitleText: {
        textAlign: 'center',
        color: '#7C7C7C',
        fontSize: 12,
    },
    box: {
        flex: 1,
        gap: 20,
        marginTop: 60,
    },
});
