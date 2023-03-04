import React from "react";
import { useState, ReactNode } from "react";

type TabProps = {
  children: ReactNode;
};

const Tab = ({ children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return (
      <a
        key={index}
        onClick={() => setActiveTab(index)}
        className={`tab tab-bordered ${
          activeTab === index ? "tab-active" : ""
        }`}
      >
        {child.props.title}
      </a>
    );
  });

  const content = React.Children.toArray(children)[activeTab];

  return (
    <>
      <div className="font-bold tabs">{tabs}</div>
      <div className="tab-content">{content}</div>
    </>
  );
};

type TabPanelProps = {
  title: string;
  children: ReactNode;
};

const TabPanel = ({ children }: TabPanelProps) => {
  return <div className="mt-4">{children}</div>;
};

export { Tab, TabPanel };
