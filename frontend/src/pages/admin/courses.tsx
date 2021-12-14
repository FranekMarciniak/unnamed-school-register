import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import {
  addErrorAction,
  addGroupAction,
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
} from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import SelectSearch from "../../components/SelectSearch";

interface Props {
  admin: IAdminState;
  addGroupAction: (name: string) => void;
  getGroupsAction: () => void;
  getTeachersAction: () => void;
  getCoursesAction: () => void;
}

const CoursesPage = ({
  admin,
  addGroupAction,
  getGroupsAction,
  getCoursesAction,
  getTeachersAction,
}: Props) => {
  useEffect(() => {
    getGroupsAction();
    getTeachersAction();
    getCoursesAction();
  }, []);

  const [groupsForm, setGroupsForm] = useState("");

  const [courseForm, setCourseForm] = useState({
    name: "",
    group_id: 0,
    teacher_id: 0,
  });

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
            <form onSubmit={handleSubmitGroups} className="mt-">
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
          <section className="w-full lg:w-1/2  px-2 ">
            <h2 className="text-2xl text-center font-semibold text-font-200 ">
              Add course
            </h2>
            <form onSubmit={handleSubmitGroups} className="mt-">
              <fieldset>
                <Input
                  name="courseName"
                  placeholder="Course Name"
                  label="Enter course name"
                  value={courseForm.name}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, name: e.target.value })
                  }
                />
                <SelectSearch
                  options={admin.groups}
                  setValue={(value: number) =>
                    setCourseForm({ ...courseForm, group_id: value })
                  }
                  value={courseForm.group_id}
                  placeholder="Group name"
                  label="Choose a group"
                  keysToDisplay={["name"]}
                />
                <SelectSearch
                  options={admin.teachers}
                  setValue={(value: number) =>
                    setCourseForm({ ...courseForm, teacher_id: value })
                  }
                  value={courseForm.teacher_id}
                  placeholder="Teachers name"
                  label="Choose a teacher"
                  keysToDisplay={["firstName", "lastName"]}
                />
              </fieldset>
            </form>
          </section>
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
  getTeachersAction,
  addErrorAction,
  getCoursesAction,
})(CoursesPage as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
