import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputSectionProps {
  averageOrderValue: number;
  setAverageOrderValue: (value: number) => void;
  margin: number;
  setMargin: (value: number) => void;
  deliveryCost: number;
  setDeliveryCost: (value: number) => void;
  deliverySalary: number;
  setDeliverySalary: (value: number) => void;
  acquisitionCost: number;
  setAcquisitionCost: (value: number) => void;
  ordersPerMonth: number;
  setOrdersPerMonth: (value: number) => void;
  numCustomers: number;
  setNumCustomers: (value: number) => void;
}

const InputSection: React.FC<InputSectionProps> = (props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <InputField
        label="Average Order Value (Rs)"
        value={props.averageOrderValue}
        onChange={props.setAverageOrderValue}
      />
      <InputField
        label="Margin (%)"
        value={props.margin}
        onChange={props.setMargin}
      />
      <InputField
        label="Delivery Cost (Rs)"
        value={props.deliveryCost}
        onChange={props.setDeliveryCost}
      />
      <InputField
        label="Delivery Salary (Rs)"
        value={props.deliverySalary}
        onChange={props.setDeliverySalary}
      />
      <InputField
        label="Customer Acquisition Cost (Rs)"
        value={props.acquisitionCost}
        onChange={props.setAcquisitionCost}
      />
      <InputField
        label="Orders per Customer per Month"
        value={props.ordersPerMonth}
        onChange={props.setOrdersPerMonth}
      />
      <InputField
        label="Number of Customers"
        value={props.numCustomers}
        onChange={props.setNumCustomers}
      />
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1"
      />
    </div>
  );
};

export default InputSection;
