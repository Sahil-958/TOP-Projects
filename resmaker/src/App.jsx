import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { FaUser, FaLink, FaTrash } from "react-icons/fa";
import { UserIcon } from "@heroicons/react/20/solid";
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

function Page({ pageIdx }) {
  const pages = [
    <PersonalDetails />,
    <Links />,
    <Education />,
    //<Experience />,
    //<Skills />,
    //<Projects />,
  ];

  function PersonalDetails() {
    return (
      <>
        <CardHeader className="flex gap-3">
          <FaUser className="icon size-8" />
          <div className="flex flex-col">
            <h1 className="text-md">Personal Details</h1>
            <p className="text-small text-default-500">
              Input your personal details
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-y-auto">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="text" label="Full Name" isRequired isClearable />
            <Input type="text" label="Job Title" />
          </div>
          <Spacer y={4} />
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="email" label="Email" isRequired isClearable />
            <Input type="tel" label="Phone" isClearable />
          </div>
          <Spacer y={4} />
          <Input type="text" label="Address" isClearable />
          <Spacer y={4} />
          <Textarea
            label="Summary"
            minRows={2}
            maxRows={4}
            placeholder="Write a short summary about yourself."
          />
        </CardBody>
      </>
    );
  }

  function Links() {
    const [links, setLinks] = useState([
      { id: Date.now() + uuidv4(), icon: "", url: "", label: "" },
      { id: Date.now() + uuidv4(), icon: "", url: "", label: "" },
      { id: Date.now() + uuidv4(), icon: "", url: "", label: "" },
      { id: Date.now() + uuidv4(), icon: "", url: "", label: "" },
    ]);

    function removeLink(id) {
      setLinks(links.filter((link) => link.id !== id));
    }

    function addLink() {
      setLinks([
        ...links,
        { id: Date.now() + uuidv4(), icon: "", url: "", label: "" },
      ]);
    }

    function inputChange(id, field, value) {
      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, [field]: value } : link,
        ),
      );
    }

    return (
      <>
        <CardHeader className="flex gap-3">
          <FaLink className="icon size-8" />
          <div className="flex flex-col">
            <h1 className="text-md">Links</h1>
            <p className="text-small text-default-500">Input your socials</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-y-auto">
          {links.map((link) => (
            <Fragment key={link.id}>
              <div className="flex w-full flex-wrap items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="text"
                  label="Icon"
                  isClearable
                  className="w-full md:w-1/3"
                  value={link.icon}
                  onChange={(e) => inputChange(link.id, "icon", e.target.value)}
                />
                <Input
                  type="url"
                  label="URL"
                  value={link.url}
                  onChange={(e) => inputChange(link.id, "url", e.target.value)}
                />
                <Input
                  type="text"
                  label="Label"
                  isClearable
                  value={link.label}
                  onChange={(e) =>
                    inputChange(link.id, "label", e.target.value)
                  }
                />
                <Button
                  isIconOnly
                  size="lg"
                  onClick={() => removeLink(link.id)}
                >
                  <FaTrash className="icon size-6" />
                </Button>
              </div>
              <Spacer y={4} />
            </Fragment>
          ))}
          <Button size="lg" onClick={addLink}>
            Add
          </Button>
        </CardBody>
      </>
    );
  }

  function Education() {
    return (
      <>
        <CardHeader className="flex gap-3">
          <UserIcon className="icon size-8" />
          <div className="flex flex-col">
            <h1 className="text-md">Education</h1>
            <p className="text-small text-default-500">
              Input your education details
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-y-auto">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="text" label="Degree" isRequired isClearable />
            <Input type="text" label="School" />
          </div>
          <Spacer y={4} />
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="text" label="Start Date" isRequired isClearable />
            <Input type="text" label="End Date" isClearable />
          </div>
          <Spacer y={4} />
          <Input type="text" label="Location" isClearable />
          <Spacer y={4} />
          <Textarea
            label="Description"
            minRows={2}
            maxRows={4}
            placeholder="Write a short description about your education."
          />
        </CardBody>
      </>
    );
  }

  return pages[pageIdx - 1];
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
