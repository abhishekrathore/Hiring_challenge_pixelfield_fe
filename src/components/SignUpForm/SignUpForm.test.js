import React from "react";
import enzyme, { shallow } from "enzyme";
import SignUpForm from "./SignUpForm"
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe("SignUpForm Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <SignUpForm  />
            ).exists()
        ).toBe(true);
    });
});