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
  FaAddressCard,
  FaEnvelope,
  FaPhoneAlt,
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
  Link,
  Textarea,
  Button,
} from "@nextui-org/react";
//import SideBar from "./components/SideBar";

function Preview({
  personalDetails,
  educationDetails,
  experienceDetails,
  links,
  skills,
}) {
  const isMailExist = personalDetails.email !== "";
  const isPhoneExist = personalDetails.phone !== "";
  const isAddressExist = personalDetails.address !== "";

  return (
    <div className="preview p-10">
      <div className="header  flex px-2">
        <h1 className="name text-4xl font-bold text-gray-800">
          {personalDetails.fullName}
        </h1>
        <p className="job-title text-md text-gray-600 self-end px-2">
          {personalDetails.jobTitle}
        </p>
      </div>
      <div className="border-b-2 border-gray-400 my-2"></div>
      <div className="contact flex gap-x-4 justify-evenly">
        <p className="flex gap-x-2 items-center">
          {isMailExist && <FaEnvelope className="icon size-4" />}
          {personalDetails.email}
        </p>
        <p className="flex gap-x-2 items-center">
          {isPhoneExist && <FaPhoneAlt className="icon size-4" />}
          {personalDetails.phone}
        </p>
        <p className="flex gap-x-2 items-center">
          {isAddressExist && <FaAddressCard className="icon size-4" />}
          {personalDetails.address}
        </p>
      </div>
      <div className="border-b-2 border-gray-300 my-2 mx-16"></div>
      <p className="summary text-justify text-gray-800">
        {personalDetails.summary}
      </p>
      <div className="border-b-2 border-gray-200 my-2"></div>
      <div className="education">
        <h2 className="flex gap-2 items-center text-2xl font-bold mb-4">
          <FaGraduationCap className="icon size-6" />
          Education
        </h2>
        <div className="education-details ">
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-bold">{educationDetails.degree}</p>
              <p>
                {educationDetails.startDate} - {educationDetails.endDate}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="font-bold">{educationDetails.university}</p>
              <p>{educationDetails.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 my-2"></div>
      <div className="skills">
        <h2 className="flex gap-2 items-center text-2xl font-bold mb-4">
          <FaLaptopCode className="icon size-6" />
          Skills
        </h2>
        <ul className="flex flex-col flex-wrap gap-2 list-disc">
          {skills.map((skill) => (
            <li key={skill.id} className="text-gray-800 ml-4">
              {skill.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b-2 border-gray-200 my-2"></div>
      <div className="experience">
        <h2 className="flex gap-2 items-center text-2xl font-bold mb-4">
          <FaBriefcase className="icon size-6" />
          Experience
        </h2>
        <div className="education-details ">
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-bold">{experienceDetails.jobTitle}</p>
              <p>
                {experienceDetails.startDate} - {experienceDetails.endDate}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="font-bold">{experienceDetails.company}</p>
              <p>{experienceDetails.location}</p>
            </div>
          </div>
        </div>
        <div className="description mt-4 text-gray-800">
          <p>{experienceDetails.description}</p>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 my-2"></div>
      <div className="links">
        <h2 className="flex gap-2 items-center text-2xl font-bold mb-4">
          <FaLink className="icon size-6" />
          Links
        </h2>
        <ul className="flex flex-col flex-wrap gap-2 list-disc">
          {links.map((link) => (
            <li key={link.id} className="text-gray-800 ml-4">
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
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
function Details({ heading, subheading, icon: Icon, fields, children }) {
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
      <CardBody className="overflow-y-auto">
        {fields
          ? fields.map((field, idx) => (
              <div
                key={idx}
                className="flex w-full flex-wrap md:flex-nowrap mb-4 last:mb-0 gap-4"
              >
                {field.map(
                  (
                    { type, label, required, name, value, onChange, ...props },
                    i,
                  ) =>
                    type === "textarea" ? (
                      <Textarea
                        key={i}
                        type={type}
                        label={label}
                        isRequired={required}
                        name={name}
                        value={value}
                        onChange={onChange}
                        {...props}
                      />
                    ) : (
                      <Input
                        key={i}
                        type={type}
                        label={label}
                        isRequired={required}
                        name={name}
                        value={value}
                        onChange={onChange}
                        {...props}
                      />
                    ),
                )}
              </div>
            ))
          : children}
      </CardBody>
    </>
  );
}

function PersonalDetails({ personalDetails, setPersonalDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const personalFields = [
    [
      {
        type: "text",
        label: "Full Name",
        required: true,
        name: "fullName",
        value: personalDetails.fullName,
        onChange: handleChange,
      },
      {
        type: "text",
        label: "Job Title",
        name: "jobTitle",
        value: personalDetails.jobTitle,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "email",
        label: "Email",
        required: true,
        name: "email",
        value: personalDetails.email,
        onChange: handleChange,
      },
      {
        type: "tel",
        label: "Phone",
        name: "phone",
        value: personalDetails.phone,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "text",
        label: "Address",
        name: "address",
        value: personalDetails.address,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "textarea",
        label: "Summary",
        name: "summary",
        value: personalDetails.summary,
        onChange: handleChange,
        minRows: 2,
        maxRows: 4,
        placeholder: "Write a short summary about yourself.",
      },
    ],
  ];

  return (
    <Details
      heading="Personal Details"
      subheading="Input your personal details"
      icon={FaUser}
      fields={personalFields}
    />
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

function Links({ links, setLinks }) {
  return (
    <Details heading="Links" subheading="Input your links" icon={FaLink}>
      {links.map((link) => (
        <Fragment key={link.id}>
          <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-4 gap-4">
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
        className="min-h-14"
        onClick={() =>
          handleAddNewItem(setLinks, {
            id: uuidv4(),
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

function Education({ educationDetails, setEducationDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const educationFields = [
    [
      {
        type: "text",
        label: "Degree",
        required: true,
        name: "degree",
        value: educationDetails.degree,
        onChange: handleChange,
      },
      {
        type: "text",
        label: "University",
        name: "university",
        value: educationDetails.university,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "text",
        label: "Start Date",
        required: true,
        name: "startDate",
        value: educationDetails.startDate,
        onChange: handleChange,
      },
      {
        type: "text",
        label: "End Date",
        name: "endDate",
        value: educationDetails.endDate,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "text",
        label: "Location",
        name: "location",
        value: educationDetails.location,
        onChange: handleChange,
      },
    ],
  ];

  return (
    <Details
      heading="Education"
      subheading="Input your education details"
      icon={FaGraduationCap}
      fields={educationFields}
    />
  );
}

function Experience({ experienceDetails, setExperienceDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const experienceFields = [
    [
      {
        type: "text",
        label: "Job Title",
        required: true,
        name: "jobTitle",
        value: experienceDetails.jobTitle,
        onChange: handleChange,
      },
      {
        type: "text",
        label: "Company",
        name: "company",
        value: experienceDetails.company,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "text",
        label: "Start Date",
        required: true,
        name: "startDate",
        value: experienceDetails.startDate,
        onChange: handleChange,
      },
      {
        type: "text",
        label: "End Date",
        name: "endDate",
        value: experienceDetails.endDate,
        onChange: handleChange,
      },
    ],
    [
      {
        type: "text",
        label: "Location",
        name: "location",
        value: experienceDetails.location,
        onChange: handleChange,
      },
    ],
  ];

  return (
    <Details
      heading="Experience"
      subheading="Input your experience details"
      icon={FaBriefcase}
      fields={experienceFields}
    />
  );
}

function Skills({ skills, setSkills }) {
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
        className="min-h-14"
        onClick={() => handleAddNewItem(setSkills, { id: uuidv4(), label: "" })}
      >
        Add
      </Button>
    </Details>
  );
}

function Page({ pageIdx, state, stateMutators }) {
  const pages = useMemo(
    () => [PersonalDetails, Links, Skills, Education, Experience],
    [],
  );

  const ActivePage = pages[pageIdx - 1];

  return <ActivePage {...state} {...stateMutators} />;
}

function App() {
  const [previewSize, setPreviewSize] = useState(1);
  const [pageIdx, setPageIdx] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "Jhon Doe",
    jobTitle: "Software Engineer",
    email: "jhondoe@gmail.com",
    phone: "1234567890",
    address: "123, Main Street, City, Country",
    summary:
      "A software engineer with 5 years of experience. Proficient in JavaScript, React, Node.js, and MongoDB with a strong understanding of algorithms and data structures.",
  });
  const [educationDetails, setEducationDetails] = useState({
    degree: "Master of Computer Applications",
    university: "University of Computer Science",
    startDate: "2015",
    endDate: "2017",
    location: "City, Country",
    description: "Specialization in Software Engineering",
  });
  const [experienceDetails, setExperienceDetails] = useState({
    jobTitle: "Software Engineer",
    company: "ABC Technologies",
    startDate: "2017",
    endDate: "2020",
    location: "City, Country",
    description:
      "Worked on developing web applications using React and Node.js",
  });
  const [links, setLinks] = useState([
    {
      id: uuidv4(),
      url: "https://linkedin.com/in/jhondoe",
      label: "LinkedIn",
    },
    {
      id: uuidv4(),
      url: "https://github.com/jhondoe",
      label: "GitHub",
    },
    { id: uuidv4(), url: "https://X.com/jhondoe", label: "X" },
  ]);
  const [skills, setSkills] = useState([
    { id: uuidv4(), label: "Languages: JavaScript, Python" },
    { id: uuidv4(), label: "Frameworks: React, Node.js" },
    { id: uuidv4(), label: "Databases: MongoDB, MySQL" },
  ]);

  const state = {
    personalDetails,
    educationDetails,
    experienceDetails,
    links,
    skills,
  };

  const stateMutators = {
    setPersonalDetails,
    setEducationDetails,
    setExperienceDetails,
    setLinks,
    setSkills,
  };

  return (
    <>
      {/* <SideBar />*/}
      <Main previewSize={previewSize}>
        <div className="editArea">
          <Card
            fullWidth
            style={{
              height: "60%",
            }}
          >
            <Page
              pageIdx={pageIdx}
              state={state}
              stateMutators={stateMutators}
            />
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
          <Preview size={previewSize} {...state} />
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
