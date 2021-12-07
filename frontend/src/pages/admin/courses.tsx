import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import {
  addErrorAction,
  addGroupAction,
  getGroupsAction,
} from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";

interface Props {
  admin: IAdminState;
  addGroupAction: (name: string) => void;
  getGroupsAction: () => void;
}

const CoursesPage = ({ admin, addGroupAction, getGroupsAction }: Props) => {
  useEffect(() => {
    getGroupsAction();
  }, []);
  console.log(admin)
  const [groupsForm, setGroupsForm] = useState("");
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupsForm !== "") addGroupAction(groupsForm);
  };
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full  lg:w-1/2  px-2 flex flex-col ">
            {/* Display all the groups  */}
            <h2 className="text-2xl text-center font-semibold text-font-200 ">
              Add groups
            </h2>
            <form onSubmit={handleSubmitGroups} className="">
              <fieldset>
                <Input
                  name="addGroups"
                  placeholder="Group name"
                  label="Group name"
                  value={groupsForm}
                  onChange={(e) => setGroupsForm(e.target.value)}
                />
                <SubmitButton text="create group" />
              </fieldset>
            </form>
          </section>
          <section className="w-full lg:w-1/2  px-2 "></section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});

const ConnectedComponent = connect(mapStateToProps, {
  addGroupAction,
  getGroupsAction,
  addErrorAction,
})(CoursesPage as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
