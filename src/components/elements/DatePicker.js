import dayjsGenerateConfig from 'antd/node_modules/rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import 'antd/lib/date-picker/style/index';

const DatePicker = generatePicker(dayjsGenerateConfig);
export default DatePicker;
