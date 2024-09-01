import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexContent from "../../src/components/Index/IndexContent.component";

// Mock the BounceInScroll component
jest.mock(
  "../../src/components/Animations/BounceInScroll.component",
  () =>
    ({ children }) => <div data-testid="bounce-in-scroll">{children}</div>,
);

// Mock the Button component
jest.mock(
  "../../src/components/UI/Button.component",
  () =>
    ({ onClick, children }) => <button onClick={onClick}>{children}</button>,
);

// Mock the PortableText component
jest.mock("@portabletext/react", () => ({
  PortableText: ({ value }) => (
    <div data-testid="portable-text">
      {value.map((block) => (
        <div key={block._key}>
          {block.children.map((child) => (
            <span key={child._key}>{child.text}</span>
          ))}
        </div>
      ))}
    </div>
  ),
}));

const mockContent = [
  {
    id: "1",
    title: "Test Title 1",
    text: [
      {
        _key: "a",
        _type: "block",
        children: [
          { _key: "a1", _type: "span", marks: ["bold"], text: "Bold Text" },
          { _key: "a2", _type: "span", marks: [], text: " Normal Text" },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
  },
  {
    id: "2",
    title: "Test Title 2",
    text: [
      {
        _key: "b",
        _type: "block",
        children: [
          { _key: "b1", _type: "span", marks: ["italic"], text: "Italic Text" },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
  },
];

describe("IndexContent Component", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  test("renders IndexContent with given content", () => {
    render(<IndexContent pageContent={mockContent} />);

    // Check if the titles are rendered
    const titles = screen.getAllByTestId("sanity-title");
    expect(titles[0]).toHaveTextContent("Test Title 1");
    expect(titles[1]).toHaveTextContent("Test Title 2");

    // Check if the content is rendered
    const portableTexts = screen.getAllByTestId("portable-text");
    expect(portableTexts[0]).toHaveTextContent("Bold Text Normal Text");
    expect(portableTexts[1]).toHaveTextContent("Italic Text");
  });

  test("renders error trigger buttons in development environment", () => {
    render(<IndexContent pageContent={mockContent} />);
    const errorButtons = screen.getAllByText("Utløs Testfeil");
    expect(errorButtons).toHaveLength(2);
  });

  test("does not render error trigger buttons in production environment", () => {
    process.env.NODE_ENV = "production";
    render(<IndexContent pageContent={mockContent} />);
    const errorButtons = screen.queryAllByText("Utløs Testfeil");
    expect(errorButtons).toHaveLength(0);
  });

  test("throws error when error button is clicked", () => {
    render(<IndexContent pageContent={mockContent} />);
    const errorButton = screen.getAllByText("Utløs Testfeil")[0];

    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow("En uventet feil har oppstått");
  });

  test("throws error when no content is provided", () => {
    expect(() => {
      render(<IndexContent pageContent={[]} />);
    }).toThrow("Ingen innhold tilgjengelig");
  });

  test("renders BounceInScroll component", () => {
    render(<IndexContent pageContent={mockContent} />);
    const bounceInScrollComponents = screen.getAllByTestId("bounce-in-scroll");
    expect(bounceInScrollComponents).toHaveLength(2);
  });

  test("handles invalid section data", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const invalidContent = [
      {
        id: "3",
        title: "",
        text: [],
      },
    ];

    render(<IndexContent pageContent={invalidContent} />);

    expect(screen.queryByTestId("sanity-section")).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Ugyldig seksjon data"),
    );

    consoleErrorSpy.mockRestore();
  });
});
