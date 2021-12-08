import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import { addErrorAction, addGroupAction, getGroupsAction } from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import Alert from "../../components/Alert";
<<<<<<< HEAD
import SelectSearch from "../../components/SelectSearch"
=======
import SelectSearch from "../../components/SelectSearch";
>>>>>>> 0b6a4f163598f416c889bb7330414365d1f84e5c

interface Props {
  admin: IAdminState;
  addGroupAction: (name: string) => void;
  getGroupsAction: () => void
}

const CoursesPage = ({ admin, addGroupAction, getGroupsAction }: Props) => {
  useEffect(() => {
<<<<<<< HEAD
    getGroupsAction()
  }, [])
  const [groupsForm, setGroupsForm] = useState("")
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupsForm !== "") addGroupAction(groupsForm);
  }
=======
    getGroupsAction();
  }, []);
  console.log(admin);
  const [groupsForm, setGroupsForm] = useState("");
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupsForm !== "") addGroupAction(groupsForm);
  };
>>>>>>> 0b6a4f163598f416c889bb7330414365d1f84e5c
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full  lg:w-1/2  px-2 flex flex-col ">
            {/* Display all the groups  */}
<<<<<<< HEAD
            <h2 className="text-2xl text-center font-semibold text-font-200 ">Add groups</h2>
=======
            <h2 className="text-2xl text-center font-semibold text-font-200 ">
              Add groups
            </h2>
>>>>>>> 0b6a4f163598f416c889bb7330414365d1f84e5c
            {admin.message && <Alert text={admin.message} />}
            {admin.errors && <Alert text={admin.errors} color="danger" />}
            <form onSubmit={handleSubmitGroups} className="mt-">
              <fieldset>
<<<<<<< HEAD
                <Input name="addGroups" placeholder="Group name" label="Group name" value={groupsForm} onChange={e => setGroupsForm(e.target.value)} />
=======
                <Input
                  name="addGroups"
                  placeholder="Group name"
                  label="Group name"
                  value={groupsForm}
                  onChange={(e) => setGroupsForm(e.target.value)}
                />
>>>>>>> 0b6a4f163598f416c889bb7330414365d1f84e5c
                <SubmitButton text="create group" />
              </fieldset>
            </form>
            <SelectSearch options={admin.groups} />
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
