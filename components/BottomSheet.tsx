import { Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, forwardRef, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import styles from "./bottomSheet.style";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={styles.toggleActive}
          >
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleInactive}
          >
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>
        <Link href={"/(modal)/location-search"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
                <Ionicons name='location-outline' size={20} colot={Colors.medium} />
                <Text style={{flex: 1}}>Current location</Text>
                <Ionicons name='chevron-forward' size={20} colot={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>

        <Text style={styles.subheader}>Arrival Time</Text>
        <TouchableOpacity>
            <View style={styles.item}>
                <Ionicons name='stopwatch-outline' size={20} colot={Colors.medium} />
                <Text style={{flex: 1}}>Now</Text>
                <Ionicons name='chevron-forward' size={20} colot={Colors.primary} />
            </View>
          </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
