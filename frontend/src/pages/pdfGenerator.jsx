import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import logoSrc from '../assets/wedding-tent-with-chandelier-and-dining-table-6103ld.png';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 40,
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        display: "inline",
        marginBottom: 8,
    },
});

const PdfFile = ({ data }) => {
    // Path to the default logo
    // const logoSrc = "frontend/src/assets/wedding-tent-with-chandelier-and-dining-table-6103ld.png"; // Replace this with the correct path or import statement

    return (
        <Document>
            <Page style={styles.page} wrap>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src={logoSrc} />
                </View>
                {/* Form Data */}
                {Object.keys(data).map((field, index) => (
                    <View key={index}>
                        <Text style={styles.text}>
                            {field}: {data[field]}
                        </Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default PdfFile;
