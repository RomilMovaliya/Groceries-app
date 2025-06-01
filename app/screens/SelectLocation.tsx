import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import LocationLogo from '../../assets/location.svg';
import CustomDropdown from '../../components/CustomDropdown';
import Button from '../../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationData } from '../../store/LocationData';
import { Area, Zone } from '../../types/types';
import { router } from 'expo-router';
import Backbtn from "../../assets/backIcon.svg";

const SelectLocation = () => {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const handleSubmit = () => {
        router.replace(`/tabs?zone=${selectedZone?.name}&area=${selectedArea?.name}`);
    };

    const backbtnHandler = () => {
        router.back();
    }

    const zoneData: Zone[] = LocationData.map((item) => ({
        id: item.id,
        name: item.zone,
    }));

    const areaData: Area[] =
        selectedZone
            ? LocationData.find((item) => item.zone === selectedZone.name)?.area.map((name, index) => ({
                id: index,
                name,
            })) ?? []
            : [];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={'white'} />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >

                <View style={styles.container}>
                    <Backbtn
                        onPress={backbtnHandler}
                        style={styles.backbtn}
                        height={28}
                        width={28}
                    />
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <LocationLogo
                            style={styles.logo}
                            height={200} width={200} />

                        <View style={styles.title}>
                            <Text style={styles.titleText}>Select Your Location</Text>
                            <Text style={styles.subtitleText}>
                                Switch on your location to stay in tune with what’s happening in your area
                            </Text>
                        </View>

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
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <Button title={'Submit'} onPress={handleSubmit} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SelectLocation;
const styles = StyleSheet.create({
    backbtn: {
        position: 'absolute',
        paddingHorizontal: 30,
        marginTop: 20,
        zIndex: 1
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        alignSelf: 'center'
    },
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    title: {
        marginTop: 20,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    subtitleText: {
        color: '#7C7C7C',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
    },
    box: {
        gap: 20,
        marginTop: 30,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});
