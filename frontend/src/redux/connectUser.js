// helper for a component to just read current user info
import { connect } from "react-redux";

const mapState = (state) => state.user;
const connectUser = connect(mapState);
export default connectUser;