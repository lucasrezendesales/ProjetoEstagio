import { IconType } from 'react-icons';
import {
  FaArrowUp,
  FaArrowDown,
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaCalendarCheck,
  FaQuestionCircle,
} from 'react-icons/fa';

type SummaryCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconBg: string;
};

const SummaryCard = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg,
}: SummaryCardProps) => {
  const iconComponents: Record<string, IconType> = {
    'exclamation-circle': FaExclamationCircle,
    clock: FaClock,
    'check-circle': FaCheckCircle,
    'calendar-check': FaCalendarCheck,
  };

  const Icon = iconComponents[icon] || FaQuestionCircle;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
      <div
        className={`${iconBg} w-12 h-12 rounded-full text-white flex items-center justify-center text-xl`}
      >
        <Icon />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-xl font-semibold text-gray-800">{value}</span>
        <span
          className={`text-xs flex items-center gap-1 ${
            changeType === 'positive'
              ? 'text-green-500'
              : changeType === 'negative'
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {changeType === 'positive' && <FaArrowDown />}
          {changeType === 'negative' && <FaArrowUp />}
          {change}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
