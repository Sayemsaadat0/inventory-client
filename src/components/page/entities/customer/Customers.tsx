import CustomerForm from "./CustomerForm"

const Customers = () => {
  return (
    <div>
      <CustomerForm handleFormSubmit={() => undefined} isLoading={false} />
    </div>
  )
}

export default Customers