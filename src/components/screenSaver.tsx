import qculogo from '../assets/imgs/logo/qculogo.png';

const ScSaver = () => {

    return (
        <div className="z-50 flex items-center justify-center w-screen h-screen skeleton bg-base-100">
            <div className="grid items-center grid-cols-3 grid-rows-3">
                <div className="flex content-center justify-center w-screen h-screen col-span-3 row-span-3">
                    <div className="content-center">
                        <div id="scsaver" className="scsaver">
                            <div className="scsaver-inner">
                                <p>Hello, Scsaver.</p>
                                {/* <!-- Customize: Place images and videos and customize them to your liking. --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ScSaver;
