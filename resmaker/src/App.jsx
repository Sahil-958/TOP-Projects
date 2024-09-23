import { useState, Fragment, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import {
  FaUser,
  FaLink,
  FaGraduationCap,
  FaBriefcase,
  FaTrash,
  FaLaptopCode,
} from "react-icons/fa";

import {
  Card,
  Slider,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Pagination,
  Input,
  Spacer,
  Textarea,
  Button,
} from "@nextui-org/react";
//import SideBar from "./components/SideBar";

function Preview() {
  return <div className="preview"></div>;
}

function Main({ previewSize, children }) {
  return (
    <div
      className="main"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr " + previewSize + "fr",
      }}
    >
      {children}
    </div>
  );
}

// Reusable Details component for consistent structure
function Details({ heading, subheading, icon: Icon, children }) {
  return (
    <>
      <CardHeader className="flex gap-3">
        <Icon className="icon size-8" />
        <div className="flex flex-col">
          <h1 className="text-md">{heading}</h1>
          <p className="text-small text-default-500">{subheading}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-y-auto">{children}</CardBody>
    </>
  );
}

function DetailContent({ fields }) {
  return (
    <>
      {fields.map((field, idx) => (
        <div
          key={idx}
          className="flex w-full flex-wrap md:flex-nowrap mb-4 gap-4"
        >
          {field.map(({ type, label, required, clearable, ...props }, i) => (
            <Input
              key={i}
              type={type}
              label={label}
              isRequired={required}
              {...props}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function PersonalDetails() {
  const personalFields = [
    [
      { type: "text", label: "Full Name", required: true },
      { type: "text", label: "Job Title" },
    ],
    [
      { type: "email", label: "Email", required: true },
      { type: "tel", label: "Phone" },
    ],
    [{ type: "text", label: "Address" }],
  ];

  return (
    <Details
      heading="Personal Details"
      subheading="Input your personal details"
      icon={FaUser}
    >
      <DetailContent fields={personalFields} />
      <Textarea
        label="Summary"
        minRows={2}
        maxRows={4}
        placeholder="Write a short summary about yourself."
      />
    </Details>
  );
}
// General function to handle changes
const handleInputChange = (id, field, value, setState) => {
  setState((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    ),
  );
};

// Function to add a new item
const handleAddNewItem = (setState, newItem) => {
  setState((prevItems) => [...prevItems, newItem]);
};

// Function to remove an item
const handleRemoveItem = (id, setState) => {
  setState((prevItems) => prevItems.filter((item) => item.id !== id));
};

function Links() {
  const [links, setLinks] = useState([
    { id: uuidv4(), icon: "", url: "", label: "" },
    { id: uuidv4(), icon: "", url: "", label: "" },
    { id: uuidv4(), icon: "", url: "", label: "" },
  ]);

  return (
    <Details heading="Links" subheading="Input your links" icon={FaLink}>
      {links.map((link) => (
        <Fragment key={link.id}>
          <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-4 gap-4">
            <Input
              type="text"
              label="Icon"
              value={link.icon}
              onChange={(e) =>
                handleInputChange(link.id, "icon", e.target.value, setLinks)
              }
            />
            <Input
              type="url"
              label="URL"
              value={link.url}
              onChange={(e) =>
                handleInputChange(link.id, "url", e.target.value, setLinks)
              }
            />
            <Input
              type="text"
              label="Label"
              value={link.label}
              onChange={(e) =>
                handleInputChange(link.id, "label", e.target.value, setLinks)
              }
            />
            <Button
              isIconOnly
              size="lg"
              onClick={() => handleRemoveItem(link.id, setLinks)}
            >
              <FaTrash className="icon size-6" />
            </Button>
          </div>
        </Fragment>
      ))}
      <Button
        size="lg"
        onClick={() =>
          handleAddNewItem(setLinks, {
            id: uuidv4(),
            icon: "",
            url: "",
            label: "",
          })
        }
      >
        Add
      </Button>
    </Details>
  );
}

function Education() {
  const educationFields = [
    [
      { type: "text", label: "Degree", required: true },
      { type: "text", label: "School" },
    ],
    [
      { type: "text", label: "Start Date", required: true },
      { type: "text", label: "End Date" },
    ],
    [{ type: "text", label: "Location" }],
  ];

  return (
    <Details
      heading="Education"
      subheading="Input your education details"
      icon={FaGraduationCap}
    >
      <DetailContent fields={educationFields} />
      <Textarea
        label="Description"
        minRows={2}
        maxRows={4}
        placeholder="Write a short description about your education."
      />
    </Details>
  );
}

function Experience() {
  const experienceFields = [
    [
      { type: "text", label: "Job Title", required: true },
      { type: "text", label: "Company" },
    ],
    [
      { type: "text", label: "Start Date", required: true },
      { type: "text", label: "End Date" },
    ],
    [{ type: "text", label: "Location" }],
  ];

  return (
    <Details
      heading="Experience"
      subheading="Input your experience details"
      icon={FaBriefcase}
    >
      <DetailContent fields={experienceFields} />
      <Textarea
        label="Description"
        minRows={2}
        maxRows={4}
        placeholder="Write a short description about your experience."
      />
    </Details>
  );
}

function Skills() {
  const [skills, setSkills] = useState([
    { id: uuidv4(), label: "" },
    { id: uuidv4(), label: "" },
    { id: uuidv4(), label: "" },
  ]);

  return (
    <Details
      heading="Skills"
      subheading="Input your Skills"
      icon={FaLaptopCode}
    >
      {skills.map((skill) => (
        <Fragment key={skill.id}>
          <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-4 gap-4">
            <Input
              type="text"
              label="Label"
              value={skill.label}
              onChange={(e) =>
                handleInputChange(skill.id, "label", e.target.value, setSkills)
              }
            />
            <Button
              isIconOnly
              size="lg"
              onClick={() => handleRemoveItem(skill.id, setSkills)}
            >
              <FaTrash className="icon size-6" />
            </Button>
          </div>
        </Fragment>
      ))}
      <Button
        size="lg"
        onClick={() => handleAddNewItem(setSkills, { id: uuidv4(), label: "" })}
      >
        Add
      </Button>
    </Details>
  );
}

function Page({ pageIdx }) {
  const pages = useMemo(
    () => [PersonalDetails, Links, Skills, Education, Experience ],
    [],
  );

  const ActivePage = pages[pageIdx - 1];

  return <ActivePage />;
}

function App() {
  const [previewSize, setPreviewSize] = useState(1);
  const [pageIdx, setPageIdx] = useState(1);

  return (
    <>
      {/* <SideBar />*/}
      <Main previewSize={previewSize}>
        <div className="editArea">
          <Card fullWidth>
            <Page pageIdx={pageIdx} />
            <Divider />
            <CardFooter className="justify-center">
              <Pagination
                isCompact
                showControls
                total={5}
                initialPage={1}
                onChange={setPageIdx}
              />
            </CardFooter>
          </Card>
        </div>
        <div className="previewArea">
          <Preview size={previewSize} />
          <div className="sizeSlider">
            <Slider
              size="lg"
              step={0.2}
              maxValue={1.6}
              minValue={0.4}
              aria-label="preview size slider"
              defaultValue={previewSize}
              onChange={setPreviewSize}
              color="secondary"
              showSteps
              showTooltip
              tooltipProps={{ content: "Preview size " + previewSize + "X" }}
              className="max-w-md"
            />
          </div>
        </div>
      </Main>
    </>
  );
}

export default App;
