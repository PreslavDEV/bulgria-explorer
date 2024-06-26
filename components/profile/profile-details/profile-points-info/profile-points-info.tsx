import { useCallback, useContext, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";

import { MonoText } from "@/components/styled-text";
import { View } from "@/components/themed";
import Icon from "@/components/ui/icon/icon";
import {
  POINTS_PER_IMAGE,
  POINTS_PER_POST,
  POINTS_PER_VOTE,
} from "@/constants/points.constants";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DictContext } from "@/providers/dictionary/dictionary.provider";

export interface IProfileDetailsProps {
  points: number;
}

export const ProfilePointsInfo = (props: IProfileDetailsProps) => {
  const { points } = props;

  const {
    text,
    points: pointsLabel,
    point,
    modalTitle,
    perPost,
    perImage,
    perVote,
  } = useContext(DictContext).profile.points;

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const colorScheme = useColorScheme();

  const handleOpenInfoModal = useCallback(() => {
    setIsInfoModalOpen(true);
  }, []);

  const handleCloseInfoModal = useCallback(() => {
    setIsInfoModalOpen(false);
  }, []);

  const getPointsText = useCallback(
    (num: number) => {
      return num > 1 ? pointsLabel : point;
    },
    [point, pointsLabel],
  );

  const contentBg = useMemo(
    () => ({ backgroundColor: colorScheme === "dark" ? "#222" : "#ddd" }),
    [colorScheme],
  );

  return (
    <>
      <TouchableOpacity style={styles.row} onPress={handleOpenInfoModal}>
        <MonoText style={styles.mediumText}>{text}</MonoText>
        <MonoText style={styles.bigText} bold>
          {`${points} ${getPointsText(points)}`}
        </MonoText>
        <Icon name="info-circle" size={14} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={isInfoModalOpen}>
        <Pressable style={styles.modalOverlay} onPress={handleCloseInfoModal}>
          <View style={[styles.modalContent, contentBg]}>
            <MonoText style={[styles.mediumText, styles.centerText]} bold>
              {modalTitle}
            </MonoText>
            <View style={[contentBg, styles.modalContentList]}>
              <View style={[contentBg, styles.modalContentListItem]}>
                <MonoText
                  bold
                  style={styles.smallText}
                >{`${POINTS_PER_POST} ${getPointsText(POINTS_PER_POST)}`}</MonoText>
                <MonoText style={styles.smallText}>{perPost}</MonoText>
              </View>

              <View style={[contentBg, styles.modalContentListItem]}>
                <MonoText
                  bold
                  style={styles.smallText}
                >{`${POINTS_PER_IMAGE} ${getPointsText(POINTS_PER_IMAGE)}`}</MonoText>
                <MonoText style={styles.smallText}>{perImage}</MonoText>
              </View>

              <View style={[contentBg, styles.modalContentListItem]}>
                <MonoText
                  bold
                  style={styles.smallText}
                >{`${POINTS_PER_VOTE} ${getPointsText(POINTS_PER_VOTE)}`}</MonoText>
                <MonoText style={styles.smallText}>{perVote}</MonoText>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  bigText: {
    fontSize: 16,
  },
  mediumText: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
  },
  centerText: {
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    marginHorizontal: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    elevation: 20,
    padding: 10,
    borderRadius: 4,
    gap: 16,
  },
  modalContentList: {
    gap: 8,
  },
  modalContentListItem: {
    flexDirection: "row",
    gap: 4,
  },
});
