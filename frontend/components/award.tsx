import { formattingNumber } from 'utils/helper.util';
import '../styles/globals.scss'
import Image from 'next/image'

type TAwardProps = {
    award_price: number;
    AwardType: {
        award_type_name: string
    };
    award_description: string;
};

type TAwardType = {
    AwardTypeName: string;
    AwardTypeColor: string;
    AwardTypeImage: string;
}

const listColor = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-primary', 'bg-secondary', 'bg-success', 'bg-warning']
const listImage = ['/voucher1.webp', '/voucher2.webp', '/voucher3.webp']

const AwardType: TAwardType[] = []

export default function Award({items} : {items: TAwardProps}) {
    let checkAwardType = AwardType.find((x) => x.AwardTypeName === items.AwardType.award_type_name)
    if(!checkAwardType) {
        AwardType.push({
            AwardTypeName: items.AwardType.award_type_name,
            AwardTypeColor: listColor[Math.floor(Math.random() * listColor.length)],
            AwardTypeImage: listImage[Math.floor(Math.random() * listImage.length)]
        })
    }
    checkAwardType = AwardType.find((x) => x.AwardTypeName === items.AwardType.award_type_name)

    return (
        <>
            <div className="card w-50 shadow align-self-center border-0">
                <Image src={checkAwardType?.AwardTypeImage || '/voucher.png'} alt="" className="card-img img-responsive" width={500} height={140}></Image>
                <div className="card-img-overlay">
                    <h6 className="card-title d-flex justify-content-end">
                        <span className={`fs-6 fw-bold ${checkAwardType?.AwardTypeColor} px-3 py-1 text-white rounded rounded-2`}>{checkAwardType?.AwardTypeName}</span>
                    </h6>
                    <div className="align-self-end mt-2 pt-5 rounded-bottom border-0">
                        <span className="fs-4 fw-bold text-black">{formattingNumber(items.award_price)}</span>
                    </div>
                </div>
            </div>
            <div className="align-self-center w-50 p-2">
                <span className="fs-5 fw-semibold">{items.award_description}</span>
            </div>
        </>
    )
}