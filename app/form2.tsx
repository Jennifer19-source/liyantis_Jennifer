import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// --- Constants & Theme ---
const COLORS = {
  background: '#181A20',
  cardBg: '#1C1C1E', // Slightly lighter for inputs/cards
  primary: '#EEFB73', // Updated yellow color
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  border: '#2C2C2E',
  danger: '#FF453A',
};

// --- Components ---
const InputField = ({ label, value, onChangeText, optional = false, suffix = '%' }: any) => (
  <View style={styles.inputContainer}>
    <View style={styles.labelRow}>
      <Text style={styles.label}>{label}</Text>
      {optional && <Text style={styles.optionalLabel}>Optional</Text>}
    </View>
    <View style={styles.inputWrapper}>
      <TextInput
        value={String(value)}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={COLORS.textGrey}
        keyboardType="default"
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  </View>
);

export default function PaymentDetailsScreen() {
  const router = useRouter();

  // --- State ---
  const [constructionTarget, setConstructionTarget] = useState("40%");
  const [handoverTarget, setHandoverTarget] = useState("60%");
  const [postHandoverTarget, setPostHandoverTarget] = useState("0");
  const [flipAt, setFlipAt] = useState("35%");
  const [handoverAt, setHandoverAt] = useState("70%");
  
  const [installments, setInstallments] = useState([
    { id: 1, displayId: "1", month: 'Nov', year: '2025', percent: 5, type: 'Down Payment' },
    { id: 2, displayId: "2", month: 'Nov', year: '2025', percent: 30, type: 'During Construction' },
    { id: 3, displayId: "3", month: 'Nov', year: '2025', percent: 5, type: 'During Construction' },
    { id: 4, displayId: "4", month: 'Nov', year: '2025', percent: 50, type: 'On Handover' },
  ]);

  // --- Computed Values ---
  const totalPercent = useMemo(() => {
    return installments.reduce((acc, curr) => acc + (Number(curr.percent) || 0), 0);
  }, [installments]);

  const totalCount = installments.length;

  // --- Handlers ---
  const addInstallment = () => {
    const newId = installments.length > 0 ? Math.max(...installments.map(i => i.id)) + 1 : 1;
    const nextDisplayId = String(installments.length + 1);
    const newInstallment = {
      id: newId,
      displayId: nextDisplayId,
      month: 'Dec',
      year: '2025',
      percent: 0,
      type: 'During Construction',
    };
    setInstallments([...installments, newInstallment]);
  };

  const removeInstallment = (id: number) => {
    setInstallments(installments.filter((item) => item.id !== id));
  };

  const updateInstallment = (id: number, field: string, value: any) => {
    setInstallments(installments.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Payment Details</Text>
          {/* Progress Bar (Step 3 active) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          {/* Top Configuration Section */}
          <View style={styles.configSection}>
            <InputField 
              label="During Construction" 
              value={constructionTarget} 
              onChangeText={setConstructionTarget} 
              suffix={null}
            />
            <InputField 
              label="On Handover" 
              value={handoverTarget} 
              onChangeText={setHandoverTarget} 
              suffix={null}
            />
            <InputField 
              label="Post Handover" 
              value={postHandoverTarget} 
              onChangeText={setPostHandoverTarget} 
              optional 
              suffix={null}
            />
            
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField 
                  label="Flip At" 
                  value={flipAt} 
                  onChangeText={setFlipAt} 
                  suffix={null} 
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField 
                  label="Handover At" 
                  value={handoverAt} 
                  onChangeText={setHandoverAt} 
                  suffix={null} 
                />
              </View>
            </View>
          </View>

          {/* Add Installments Header */}
          <View style={styles.headerRow}>
            <Text style={styles.sectionHeaderTitle}>Add Installments</Text>
            <TouchableOpacity onPress={addInstallment} style={styles.addButton}>
              <Ionicons name="add" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            Add installments to complete the 100% payment for the project.
          </Text>

          {/* Progress Card (The "Graph") */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <View style={styles.percentRow}>
                  <Text style={styles.bigPercent}>{totalPercent}%</Text>
                </View>
                <Text style={styles.cardLabel}>COMPLETE</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.bigCount}>{totalCount}</Text>
                <Text style={styles.cardLabel}>Total Installments</Text>
              </View>
            </View>

            {/* Dynamic Dotted Graph */}
            <View style={styles.graphContainer}>
              {/* Background Track (Dots) */}
              <View style={styles.trackContainer}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <View key={i} style={styles.trackDot} />
                ))}
              </View>
              
              {/* Active Nodes */}
              <View style={styles.nodesContainer}>
                {installments.map((inst) => (
                  <View key={inst.id} style={styles.nodeWrapper}>
                    <View style={styles.activeNode} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Installments List */}
          <View style={styles.listContainer}>
            {installments.map((inst) => (
              <View key={inst.id} style={styles.listItem}>
                {/* Editable Index */}
                <TextInput
                  style={styles.indexInput}
                  value={inst.displayId}
                  onChangeText={(text) => updateInstallment(inst.id, 'displayId', text)}
                />

                {/* Editable Date */}
                <View style={styles.dateColumn}>
                  <TextInput
                    style={styles.monthInput}
                    value={inst.month}
                    onChangeText={(text) => updateInstallment(inst.id, 'month', text)}
                  />
                  <TextInput
                    style={styles.yearInput}
                    value={inst.year}
                    onChangeText={(text) => updateInstallment(inst.id, 'year', text)}
                  />
                </View>

                {/* Percentage Input */}
                <View style={styles.percentInputWrapper}>
                  <TextInput
                    style={styles.percentInput}
                    value={String(inst.percent)}
                    onChangeText={(text) => updateInstallment(inst.id, 'percent', Number(text))}
                    placeholder="0"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                  />
                  <Text style={styles.percentSuffix}>%</Text>
                </View>

                {/* Type Dropdown / Label */}
                <View style={styles.typeWrapper}>
                  <View style={styles.typeRow}>
                    <Text style={styles.typeText} numberOfLines={1}>
                      {inst.type}
                    </Text>
                    {inst.type !== 'Down Payment' && (
                      <Ionicons name="chevron-down" size={14} color="#64748b" style={{ marginLeft: 4 }} />
                    )}
                  </View>
                </View>

                {/* Remove Action */}
                <TouchableOpacity 
                  onPress={() => removeInstallment(inst.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close" size={16} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            ))}
            
            {installments.length === 0 && (
              <Text style={styles.emptyText}>
                No installments added. Tap + to start.
              </Text>
            )}
          </View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
            <View style={styles.footerContent}>
              <Ionicons name="information-circle-outline" size={12} color={COLORS.textGrey} />
              <Text style={styles.footerText}>Total calculated automatically</Text>
            </View>
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form3')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButton: { padding: 4 },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
  },
  progressActive: { backgroundColor: COLORS.primary },
  
  scrollContent: { 
    padding: 20,
    paddingBottom: 40, // Normal padding since button is now in scroll content
  },

  // --- Config Section ---
  configSection: {
    marginBottom: 24,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    color: COLORS.textGrey,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  optionalLabel: {
    color: COLORS.textGrey,
    fontSize: 12,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 16,
    color: COLORS.textWhite,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  suffix: {
    position: 'absolute',
    right: 16,
    color: COLORS.textGrey,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },

  // --- Header ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#27292D',
    borderRadius: 10,
    width: 22.86,
    height: 21.86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    color: COLORS.textGrey,
    fontSize: 12,
    marginBottom: 24,
  },

  // --- Graph Card ---
  card: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 24,
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bigPercent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  bigCount: {
    fontSize: 36,
    fontWeight: '300',
    color: COLORS.textWhite,
  },
  cardLabel: {
    color: COLORS.textGrey,
    fontSize: 10,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  graphContainer: {
    height: 24,
    justifyContent: 'center',
    width: '100%',
  },
  trackContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  trackDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
  },
  nodesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  nodeWrapper: {
    // Wrapper to help hit area if needed
  },
  activeNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fde047',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  // --- List ---
  listContainer: {
    gap: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexInput: {
    width: 32,
    marginRight: 8,
    color: COLORS.textWhite,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  dateColumn: {
    flexDirection: 'column',
    width: 60,
    marginRight: 8,
  },
  monthInput: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    padding: 0,
    marginBottom: 2,
  },
  yearInput: {
    color: COLORS.textGrey,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    padding: 0,
  },
  percentInputWrapper: {
    width: 60,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  percentInput: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.textWhite,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    padding: 0,
  },
  percentSuffix: {
    color: COLORS.textGrey,
    fontSize: 14,
    marginLeft: 2,
  },
  typeWrapper: {
    flex: 1,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textGrey,
    fontStyle: 'italic',
    paddingVertical: 20,
  },

  // --- Footer ---
  footerInfo: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBg,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: COLORS.textGrey,
    fontSize: 12,
  },

  nextButtonContainer: {
    marginTop: 30, // 30px spacing after last content
    marginBottom: 20, // Bottom margin for scroll content
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
});