import UsersForm from "./UsersForm"

const Users = () => {
    return (
        <div>
            Users
            <UsersForm handleFormSubmit={() => undefined} isLoading={false} />
        </div>
    )
}

export default Users