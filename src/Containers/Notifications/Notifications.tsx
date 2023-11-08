import Layout from "../../Components/Layout/Layout";
import classes from "./Notifications.module.css";
import Card from "../../Components/Card/Card";

const Notifications = () => {
  const notifications: { title: string; time: string }[] | [] = [
    // {
    //   title: "Withdrawal confirmed",
    //   time: "12:03px",
    // },
    // {
    //   title: "Withdrawal confirmed",
    //   time: "12:03px",
    // },
    // {
    //   title: "Withdrawal confirmed",
    //   time: "12:03px",
    // },
    // {
    //   title: "Withdrawal confirmed",
    //   time: "12:03px",
    // },
  ];
  return (
    <Layout title="Notifications">
      <div className={classes.container}>
        {notifications.length > 0 ? (
          notifications.map((data, i) => {
            return (
              <div key={i} className={classes.notification}>
                <Card>
                  <p>{data.title}</p>
                  <p>{data.time}</p>
                </Card>
              </div>
            );
          })
        ) : (
          <div className={classes.container}>
            <p className={classes.noNotifications}>
              No notifications available at this time
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
