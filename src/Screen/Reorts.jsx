import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Pressable, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const Reports = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [reports, setReports] = useState([
        {
            id: '1',
            title: 'Monthly Patient Statistics',
            type: 'monthly',
            date: 'May 2024',
            category: 'patients',
            status: 'completed',
            downloads: 15
        },
        {
            id: '2',
            title: 'Weekly Financial Report',
            type: 'weekly',
            date: 'Week 3, May 2024',
            category: 'financial',
            status: 'pending',
            downloads: 8
        },
        {
            id: '3',
            title: 'ICU Operations Report',
            type: 'custom',
            date: '15 May 2024',
            category: 'operations',
            status: 'completed',
            downloads: 23
        },
    ]);

    const categories = {
        patients: { name: 'Patients', icon: 'account-group', color: '#00796B' },
        financial: { name: 'Financial', icon: 'finance', color: '#689F38' },
        operations: { name: 'Operations', icon: 'hospital-building', color: '#D32F2F' },
    };

    const filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddReport = () => {
        // Implement report creation logic
        alert('Add new report functionality');
    };


    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission Required",
                        message: "App needs access to storage to download files",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleDownload = async (reportId) => {
        try {
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
                alert('Storage permission required');
                return;
            }

            const dummyPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
            const fileName = `Report_${Date.now()}.pdf`;
            const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
            const options = {
                fromUrl: dummyPdfUrl,
                toFile: downloadDest,
                background: true,
                begin: (res) => {
                    console.log('Download began:', res);
                    alert('Download started...');
                },
            };

            const download = await RNFS.downloadFile(options).promise;

            await download;
            alert('Download completed! File saved in Downloads folder');
            FileViewer.open(downloadDest)
                .catch(error => {
                    console.log('File open error:', error);
                    alert('Cannot open file. Make sure you have a PDF reader installed.');
                });

        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    };

    const renderItem = ({ item }) => (
        <Pressable style={styles.reportCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: categories[item.category].color }]}>
                    <Icon name={categories[item.category].icon} size={20} color="white" />
                </View>
                <Text style={styles.reportDate}>{item.date}</Text>
                <TouchableOpacity onPress={() => handleDownload(item.id)}>
                    <Icon name="download" size={20} color="#00796B" />
                </TouchableOpacity>
            </View>
            <Text style={styles.reportTitle}>{item.title}</Text>
            <View style={styles.cardFooter}>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? '#C8E6C9' : '#FFECB3' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'completed' ? '#2E7D32' : '#F57F17' }]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                </View>
                <View style={styles.downloadsContainer}>
                    <Icon name="download-circle" size={16} color="#00796B" />
                    <Text style={styles.downloadsText}>{item.downloads} downloads</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Icon name="magnify" size={20} color="#00796B" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#90A4AE"
                    />
                </View>
            </View>

            <FlatList
                data={filteredReports}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Icon name="file-document-outline" size={50} color="#00796B" />
                        <Text style={styles.emptyText}>No reports found</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddReport}>
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#00796B',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 45,
        color: '#455A64',
        fontSize: 16,
        paddingVertical: 10
    },
    listContent: {
        padding: 20,
    },
    reportCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportDate: {
        color: '#607D8B',
        fontSize: 14,
        flex: 1,
        marginLeft: 12,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#263238',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    downloadsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    downloadsText: {
        color: '#607D8B',
        fontSize: 12,
        marginLeft: 6,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00796B',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    emptyText: {
        color: '#90A4AE',
        fontSize: 16,
        marginTop: 16,
    },
});

export default Reports;