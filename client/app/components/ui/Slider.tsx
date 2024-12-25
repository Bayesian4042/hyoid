import { Slider } from 'antd';

interface CustomSliderProps {
  title: string;
  desc: string;
  value: number;
  setValue: (value: number) => void;
}

const CustomSlider = ({ title, desc, value, setValue }: CustomSliderProps) => {
  return (
    <div className="border-[1px] py-4 rounded-2xl px-9 bg-gray-50">
      <div className="mb-4">
        <h1 className="font-semibold text-lg">{title}</h1>
        <h6 className="text-gray-500">{desc}</h6>
      </div>
      <Slider
        min={0}
        max={0.95}
        step={0.10}
        value={value}
        onChange={setValue}
        className="w-full" 
      />
    </div>
  );
};

export default CustomSlider;
