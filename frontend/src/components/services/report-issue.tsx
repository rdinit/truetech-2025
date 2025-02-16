import { IconCard } from "../ui/card";
import { showModal } from "../ui/modal/show";
import { ReportIssueModal } from "./report-issue-modal";

const Icon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="#DC2626" />
    <path
      d="M24.1083 21L17.4417 9.33332C17.2963 9.07682 17.0855 8.86347 16.8308 8.71504C16.576 8.56661 16.2865 8.4884 15.9917 8.4884C15.6968 8.4884 15.4073 8.56661 15.1526 8.71504C14.8978 8.86347 14.687 9.07682 14.5417 9.33332L7.875 21C7.72807 21.2544 7.65102 21.5432 7.65167 21.8371C7.65233 22.1309 7.73065 22.4194 7.87871 22.6732C8.02676 22.927 8.23929 23.1371 8.49475 23.2823C8.7502 23.4275 9.03951 23.5026 9.33333 23.5H22.6667C22.9591 23.4997 23.2463 23.4225 23.4994 23.2761C23.7525 23.1297 23.9627 22.9192 24.1088 22.6659C24.2548 22.4126 24.3317 22.1253 24.3316 21.8329C24.3315 21.5405 24.2545 21.2532 24.1083 21Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 13.5V16.8333"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 20.1666H16.0083"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ReportIssue = () => {
  const onClick = async () => {
    showModal(ReportIssueModal, { item: null });
  };

  return (
    <button onClick={onClick}>
      <IconCard
        icon={Icon}
        title="Сообщить об аварии"
        description="Оставить заявку об аварии. Если она подтвердится, мы начислим вам баллы за уведомление"
      />
    </button>
  );
};
