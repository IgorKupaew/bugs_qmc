export const fixNotificationsModalPosition = (isModalOpen: boolean) => {
  if (isModalOpen) {
    const antModalWrap = document.querySelector(".ant-modal-wrap");
    if (antModalWrap && antModalWrap?.children[0]?.classList[1] === "notificationModal") {
      antModalWrap.className = "ant-modal-wrap notificationModalWrapper";
    }
  }
};

export enum statusColors {
  "#C7C7C7",
  "#13A10E",
  "#EE5157",
  "#FFB900",
}
