import PageHeader from "@/components/UI/PageHeader.component";
import Button from "@/components/UI/Button.component";
import CVTest from "./CVTest.component";

/**
 * Renders CV content
 * @function CVContent
 * @returns {JSX.Element} - Rendered component
 */

const CVContent = () => (
  <main id="maincontent">
    <div className="mt-32 bg-graybg">
      <PageHeader>CV</PageHeader>
      <div className="px-4 lg:px-0 xl:px-0 md:px-0">
        <div className="container mx-auto bg-slate-700 rounded shadow sm:mb-4">
          <div className="p-4 mx-auto h-96 md:h-full mt-4 flex justify-center items-center md:min-h-[540px]">
            <div className="p-4 text-lg rounded md:w-full">
              <CVTest />
              <div className="mx-auto text-center mt-8">
                <Button href="./cv.pdf" renderAs="a" type="button">
                  Last ned PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default CVContent;
