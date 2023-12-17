import "./Employees.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../../../store/user"
import EditEmployees from "./EditEmployees/EditEmployees";

function EmployeesSection() {
    const dispatch = useDispatch()

    const [usernameSort, setUsernameSort] = useState("ASC")
    const [roleSort, setRoleSort] = useState(null)

    useEffect(() => {
        if (usernameSort) {
            dispatch(userActions.loadSortedEmployeesThunk("username", usernameSort))
        } else {
            dispatch(userActions.loadSortedEmployeesThunk("role", roleSort))
        }
    }, [dispatch, usernameSort, roleSort])

    const allEmployees = Object.values(useSelector(state => state.user))

    const [expandRow, setExpandRow] = useState(null)

    const handleRowClick = (index) => {
        setExpandRow(prev => prev === index ? null : index)
    }

    const handleCloseExpandRow = () => {
        setExpandRow(null)
    }

    const handleSortChanging = (mode, order) => {
        setExpandRow(null)
        if (mode === "username") {
            setUsernameSort(order)
            setRoleSort(null)
        } else if (mode === "role") {
            setUsernameSort(null)
            setRoleSort(order)
        }
    }

    return (
        <div>
            {/* Employee Header */}
            <section className="dashboard-header">
                <aside className="width-200">
                    Username
                    <section id="arrow-icon" className="pointer">
                        {usernameSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('username', 'DESC')} />
                        ) : usernameSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('username', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('username', 'ASC')} />
                        )}
                    </section>
                </aside>
                <aside className="width-300">Email</aside>
                <aside className="width-100">
                    Role
                    <section id="arrow-icon" className="pointer">
                        {roleSort === 'ASC' ? (
                            <i className="bx bx-caret-up" onClick={() => handleSortChanging('role', 'DESC')} />
                        ) : roleSort === 'DESC' ? (
                            <i className="bx bx-caret-down" onClick={() => handleSortChanging('role', 'ASC')} />
                        ) : (
                            <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('role', 'ASC')} />
                        )}
                    </section>
                </aside>
            </section>

            {/* Employee Body */}
            <section>
                {allEmployees.length === 0 ? (
                    <section>You have no employees to list</section>
                ) : (
                    <section className="dashboard-body">
                        {allEmployees.map((el, i) => (
                            <div key={i} className="dashboard-one-employee">
                                <section className="pointer dashboard-one-employee-row" onClick={() => handleRowClick(i)}>
                                    <aside className="width-200">{el.username}</aside>
                                    <aside className="width-300">{el.email}</aside>
                                    <aside className="width-100">
                                        {el.role ? el.role.charAt(0).toUpperCase() + el.role.slice(1) : 'Unknown Role'}
                                    </aside>
                                </section>
                                <section className={`expanded-row ${expandRow === i ? 'employee-show' : ''}`} key={i}>
                                    {expandRow === i ? (
                                        <EditEmployees employee={el} onCloseExpandRow={handleCloseExpandRow} />
                                    ) : (
                                        <></>
                                    )}
                                </section>
                            </div>
                        ))}
                    </section>
                )}
            </section>
        </div>
    )
}

export default EmployeesSection;
